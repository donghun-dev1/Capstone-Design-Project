import { pgTable, text, serial, integer, boolean, json, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Diet Recommendation Schema
export const userInfoSchema = z.object({
  gender: z.enum(["male", "female"]),
  height: z.number().min(100).max(220),
  weight: z.number().min(30).max(200),
  bodyFat: z.number().min(5).max(50),
  goal: z.enum(["lose", "maintain", "gain", "muscle"]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  mealsPerDay: z.number().min(3).max(5),
  allergies: z.string(),
  budget: z.number().min(5000).max(100000),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "이용약관에 동의해야 합니다.",
  }),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export const mealSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  ingredients: z.array(z.string()),
  recipe: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type Meal = z.infer<typeof mealSchema>;

export const dietRecommendationSchema = z.object({
  meals: z.array(mealSchema),
  summary: z.object({
    totalCalories: z.number(),
    totalProtein: z.number(),
    totalCarbs: z.number(),
    totalFat: z.number(),
    totalBudget: z.number(),
    nutritionAnalysis: z.string(),
    recommendations: z.array(z.string()),
  }),
});

export type DietRecommendation = z.infer<typeof dietRecommendationSchema>;
