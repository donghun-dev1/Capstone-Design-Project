import React, { useMemo } from 'react';
import { Meal, DietRecommendation } from '@shared/schema';
import { Flame, Beef, Cookie, Droplet, CreditCard } from 'lucide-react';

interface RightInfoBoxProps {
  summary?: DietRecommendation['summary'];
  selectedMeals: (Meal | null)[];
}

const RightInfoBox: React.FC<RightInfoBoxProps> = ({ summary, selectedMeals }) => {
  // 선택한 식단의 총 영양소 계산
  const selectedNutrition = useMemo(() => {
    const initialValue = { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 };
    
    return selectedMeals.reduce((acc, meal) => {
      if (!meal) return acc;
      
      return {
        calories: acc.calories + (meal.calories || meal.nutrition?.calories || 0),
        protein: acc.protein + (meal.protein || meal.nutrition?.protein || 0),
        carbs: acc.carbs + (meal.carbs || meal.nutrition?.carbs || 0),
        fat: acc.fat + (meal.fat || meal.nutrition?.fat || 0),
        cost: acc.cost + (meal.price || 0),
      };
    }, initialValue);
  }, [selectedMeals]);
  
  // 예산 및 목표 영양소 계산
  const remaining = useMemo(() => {
    if (!summary) return null;
    
    return {
      calories: summary.totalCalories - selectedNutrition.calories,
      protein: summary.totalProtein - selectedNutrition.protein,
      carbs: summary.totalCarbs - selectedNutrition.carbs,
      fat: summary.totalFat - selectedNutrition.fat,
      budget: summary.totalBudget - selectedNutrition.cost,
    };
  }, [summary, selectedNutrition]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sticky top-4">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">영양 정보</h3>
      
      <div className="space-y-4">
        {/* 총 칼로리 */}
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 p-1.5 bg-blue-100 dark:bg-blue-800 rounded-full">
                <Flame className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">총 칼로리</span>
            </div>
            <div className="font-semibold">
              {selectedNutrition.calories} 
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">kcal</span>
            </div>
          </div>
          {remaining && (
            <div className="mt-1 text-xs text-right">
              <span className={remaining.calories >= 0 ? 'text-green-500' : 'text-red-500'}>
                {remaining.calories >= 0 ? `남은 칼로리: ${remaining.calories}kcal` : `초과: ${Math.abs(remaining.calories)}kcal`}
              </span>
            </div>
          )}
        </div>
        
        {/* 단백질 */}
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 p-1.5 bg-red-100 dark:bg-red-800 rounded-full">
                <Beef className="w-4 h-4 text-red-500 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">단백질</span>
            </div>
            <div className="font-semibold">
              {selectedNutrition.protein}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">g</span>
            </div>
          </div>
          {remaining && (
            <div className="mt-1 text-xs text-right">
              <span className={remaining.protein >= 0 ? 'text-green-500' : 'text-red-500'}>
                {remaining.protein >= 0 ? `남음: ${remaining.protein}g` : `초과: ${Math.abs(remaining.protein)}g`}
              </span>
            </div>
          )}
        </div>
        
        {/* 탄수화물 */}
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 p-1.5 bg-amber-100 dark:bg-amber-800 rounded-full">
                <Cookie className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">탄수화물</span>
            </div>
            <div className="font-semibold">
              {selectedNutrition.carbs}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">g</span>
            </div>
          </div>
          {remaining && (
            <div className="mt-1 text-xs text-right">
              <span className={remaining.carbs >= 0 ? 'text-green-500' : 'text-red-500'}>
                {remaining.carbs >= 0 ? `남음: ${remaining.carbs}g` : `초과: ${Math.abs(remaining.carbs)}g`}
              </span>
            </div>
          )}
        </div>
        
        {/* 지방 */}
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 p-1.5 bg-green-100 dark:bg-green-800 rounded-full">
                <Droplet className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">지방</span>
            </div>
            <div className="font-semibold">
              {selectedNutrition.fat}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">g</span>
            </div>
          </div>
          {remaining && (
            <div className="mt-1 text-xs text-right">
              <span className={remaining.fat >= 0 ? 'text-green-500' : 'text-red-500'}>
                {remaining.fat >= 0 ? `남음: ${remaining.fat}g` : `초과: ${Math.abs(remaining.fat)}g`}
              </span>
            </div>
          )}
        </div>
        
        {/* 예산 */}
        {summary && (
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 p-1.5 bg-purple-100 dark:bg-purple-800 rounded-full">
                  <CreditCard className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">예산</span>
              </div>
              <div className="font-semibold">
                {selectedNutrition.cost.toLocaleString()}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">원</span>
              </div>
            </div>
            {remaining && (
              <div className="mt-1 text-xs text-right">
                <span className={remaining.budget >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {remaining.budget >= 0 ? `남은 예산: ${remaining.budget.toLocaleString()}원` : `초과: ${Math.abs(remaining.budget).toLocaleString()}원`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightInfoBox;