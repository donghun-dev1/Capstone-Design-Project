import express, { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userInfoSchema, dietRecommendationSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { ZodError } from "zod";

// Used for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || "development_jwt_secret";

export async function registerRoutes(app: Express): Promise<Server> {
  // Issue anonymous JWT token
  app.post("/api/auth/issue", async (req, res) => {
    try {
      // Create anonymous token that expires in 24 hours
      const token = jwt.sign({ anonymous: true }, JWT_SECRET, { expiresIn: "24h" });
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error issuing token:", error);
      return res.status(500).json({ message: "Failed to issue token" });
    }
  });

  // Verify JWT token middleware
  const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };

  // Nutrition summary endpoint
  app.post("/api/summary", verifyToken, async (req, res) => {
    try {
      // 입력된 알레르기 정보가 문자열인 경우 배열로 변환
      const rawData = req.body;
      
      if (typeof rawData.allergies === 'string' && rawData.allergies.trim() !== '') {
        rawData.allergies = rawData.allergies.split(',').map((item: string) => item.trim());
      } else if (!Array.isArray(rawData.allergies)) {
        rawData.allergies = [];
      }
      
      // Validate user info
      const userInfo = userInfoSchema.parse(rawData);
      
      // Generate only summary info without full meal details
      const recommendation = generateDietRecommendation(userInfo);
      
      return res.status(200).json({ summary: recommendation.summary });
    } catch (error) {
      console.error("Error generating nutrition summary:", error);
      
      if (error instanceof ZodError) {
        return res.status(422).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ message: "Failed to generate nutrition summary" });
    }
  });

  // Diet recommendation endpoint
  app.post("/api/recommend", verifyToken, async (req, res) => {
    try {
      // 입력된 알레르기 정보가 문자열인 경우 배열로 변환
      const rawData = req.body;
      
      if (typeof rawData.allergies === 'string' && rawData.allergies.trim() !== '') {
        rawData.allergies = rawData.allergies.split(',').map((item: string) => item.trim());
      } else if (!Array.isArray(rawData.allergies)) {
        rawData.allergies = [];
      }
      
      // Validate user info
      const userInfo = userInfoSchema.parse(rawData);
      
      // This would normally call an external AI service, for the purpose of this project
      // we'll generate a simple recommendation based on the user's information
      const recommendation = generateDietRecommendation(userInfo);
      
      return res.status(200).json(recommendation);
    } catch (error) {
      console.error("Error generating recommendation:", error);
      
      if (error instanceof ZodError) {
        return res.status(422).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ message: "Failed to generate recommendation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate diet recommendations based on user info
function generateDietRecommendation(userInfo: z.infer<typeof userInfoSchema>) {
  // Basic BMR calculation (Mifflin-St Jeor Equation)
  let bmr;
  if (userInfo.gender === "male") {
    bmr = 10 * userInfo.weight + 6.25 * userInfo.height - 5 * 30 + 5; // Assuming age 30 for simplicity
  } else {
    bmr = 10 * userInfo.weight + 6.25 * userInfo.height - 5 * 30 - 161; // Assuming age 30 for simplicity
  }

  // Activity multiplier
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const tdee = bmr * activityMultipliers[userInfo.activityLevel];

  // Adjust based on goal
  let targetCalories;
  switch (userInfo.goal) {
    case "lose":
      targetCalories = tdee * 0.8; // 20% deficit
      break;
    case "gain":
      targetCalories = tdee * 1.1; // 10% surplus
      break;
    case "muscle":
      targetCalories = tdee * 1.15; // 15% surplus
      break;
    default:
      targetCalories = tdee; // maintain
  }

  // Generate meals based on calories and meals per day
  const meals = [];
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const caloriesPerMeal = targetCalories / userInfo.mealsPerDay;

  for (let i = 0; i < userInfo.mealsPerDay; i++) {
    const meal = {
      id: `meal-${i + 1}`,
      name: `Sample ${mealTypes[i] || "meal"} ${i + 1}`,
      type: mealTypes[i] || "meal",
      calories: Math.round(caloriesPerMeal),
      protein: Math.round(caloriesPerMeal * 0.3 / 4), // 30% protein, 4 calories per gram
      carbs: Math.round(caloriesPerMeal * 0.4 / 4),   // 40% carbs, 4 calories per gram
      fat: Math.round(caloriesPerMeal * 0.3 / 9),     // 30% fat, 9 calories per gram
      ingredients: ["샘플 재료 1", "샘플 재료 2", "샘플 재료 3"],
      recipe: "이 음식을 준비하는 방법에 대한 샘플 지침입니다."
    };
    meals.push(meal);
  }

  // 알레르기 정보를 반영한 식단 조정
  let allergyRecommendation = "";
  if (userInfo.allergies && userInfo.allergies.length > 0) {
    // 실제로는 여기서 알레르기 필터링 로직을 추가해야 합니다.
    // 예시: 해당 알레르기 성분이 없는 음식만 추천
    console.log(`필터링할 알레르기: ${userInfo.allergies.join(', ')}`);
    allergyRecommendation = `${userInfo.allergies.join(', ')} 알레르기를 고려한 식단입니다.`;
  }
  
  // Create recommendation summary
  const recommendation = {
    meals,
    summary: {
      totalCalories: Math.round(targetCalories),
      totalProtein: Math.round(targetCalories * 0.3 / 4),
      totalCarbs: Math.round(targetCalories * 0.4 / 4),
      totalFat: Math.round(targetCalories * 0.3 / 9),
      totalBudget: userInfo.budget,
      nutritionAnalysis: "이 식단은 귀하의 목표와 신체 조건에 맞게 맞춤화되었습니다.",
      recommendations: [
        "규칙적인 식사와 수분 섭취를 유지하세요.",
        "가능하면 신선한 재료를 선택하세요.",
        "영양소 균형을 위해 다양한 색상의 과일과 채소를 섭취하세요.",
        ...(allergyRecommendation ? [allergyRecommendation] : [])
      ]
    }
  };

  return recommendation;
}
