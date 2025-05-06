import React from 'react';
import { Meal } from '@shared/schema';
import { X, Coffee, Sun, Moon } from 'lucide-react';

interface LeftBoxProps {
  selectedMeals: (Meal | null)[];
  onRemove: (index: number) => void;
}

const mealLabels = ['아침', '점심', '저녁'];
const mealIcons = [Coffee, Sun, Moon];
const mealColors = [
  'bg-orange-50 border-orange-200',  // 아침 - 따뜻한 오렌지
  'bg-yellow-50 border-yellow-200',  // 점심 - 밝은 노란색
  'bg-blue-50 border-blue-200',      // 저녁 - 시원한 파란색
];
const iconColors = [
  'text-orange-500',  // 아침
  'text-yellow-500',  // 점심
  'text-blue-500',    // 저녁
];

const LeftBox: React.FC<LeftBoxProps> = ({ selectedMeals, onRemove }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sticky top-4">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">선택한 식단</h3>
      
      <div className="space-y-4">
        {selectedMeals.map((meal, index) => {
          const MealIcon = mealIcons[index];
          
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${mealColors[index]} dark:border-gray-700`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MealIcon size={16} className={`${iconColors[index]} mr-2`} />
                  <span className="text-sm font-medium">{mealLabels[index]}</span>
                </div>
              </div>
              
              {meal ? (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 mr-3 rounded overflow-hidden">
                    <img 
                      src={meal.imageUrl || '/placeholder-food.jpg'} 
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{meal.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {meal.calories || meal.nutrition?.calories || 0}kcal
                    </div>
                  </div>
                  <button 
                    className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 hover:text-red-500"
                    onClick={() => onRemove(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16 text-gray-400 dark:text-gray-500">
                  비어 있음
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftBox;