import React, { useState } from 'react';
import { Meal } from '@shared/schema';
import { X, ShoppingBag, Info, Plus } from 'lucide-react';

interface FoodDetailProps {
  meal: Meal;
  onClose: () => void;
  onSelect: () => void;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ meal, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={meal.imageUrl || '/placeholder-food.jpg'} 
            alt={meal.name}
            className="w-full h-48 object-cover"
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{meal.name}</h2>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex flex-wrap">
          {meal.tags?.map(tag => (
            <span key={tag} className="inline-block mr-2 mb-1 text-primary">
              #{tag}
            </span>
          )) || <span className="text-primary">#일반식 #건강식</span>}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
            <div className="text-xs text-blue-500 dark:text-blue-400">칼로리</div>
            <div className="font-semibold">{meal.calories || meal.nutrition?.calories || 0}kcal</div>
          </div>
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
            <div className="text-xs text-red-500 dark:text-red-400">단백질</div>
            <div className="font-semibold">{meal.protein || meal.nutrition?.protein || 0}g</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-center">
            <div className="text-xs text-amber-500 dark:text-amber-400">탄수화물</div>
            <div className="font-semibold">{meal.carbs || meal.nutrition?.carbs || 0}g</div>
          </div>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
            <div className="text-xs text-green-500 dark:text-green-400">지방</div>
            <div className="font-semibold">{meal.fat || meal.nutrition?.fat || 0}g</div>
          </div>
        </div>
        
        <button
          className="w-full py-3 bg-primary text-white font-medium rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/90"
          onClick={onSelect}
        >
          <ShoppingBag size={18} />
          <span>담기</span>
        </button>
      </div>
    </div>
  );
};

interface FoodCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ meal, onSelect }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handleSelectMeal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // 이벤트 버블링 방지
    onSelect(meal);
    if (showPopup) setShowPopup(false);
  };
  
  return (
    <>
      <div 
        className="food-card p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 flex flex-col md:flex-row md:h-44 w-full"
      >
        <div className="relative rounded-lg overflow-hidden mb-3 md:mb-0 md:w-44 md:min-w-44 md:mr-5 flex-shrink-0">
          <img 
            src={meal.imageUrl || '/placeholder-food.jpg'} 
            alt={meal.name}
            className="w-full h-36 md:h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {meal.score || 85}점
          </div>
        </div>
        
        <div className="flex flex-col justify-between flex-grow overflow-hidden">
          <div>
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">{meal.name}</h3>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap">
              {meal.tags?.map(tag => (
                <span key={tag} className="inline-block mr-1 mb-1 text-primary">
                  #{tag}
                </span>
              )) || <span className="text-primary">#일반식 #건강식</span>}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end mt-auto">
            <div className="hidden md:flex mb-2 md:mb-0 md:mr-auto flex-wrap w-full max-w-md">
              <div className="text-xs font-semibold mr-4 mb-1">
                <span className="text-blue-500">칼로리:</span> {meal.calories}kcal
              </div>
              <div className="text-xs font-semibold mr-4 mb-1">
                <span className="text-red-500">단백질:</span> {meal.protein}g
              </div>
              <div className="text-xs font-semibold mr-4 mb-1">
                <span className="text-amber-500">탄수화물:</span> {meal.carbs}g
              </div>
              <div className="text-xs font-semibold mr-4">
                <span className="text-green-500">지방:</span> {meal.fat || 0}g
              </div>
            </div>
            
            <div className="flex space-x-2 mt-2 md:mt-0 md:flex-shrink-0">
              <button 
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 flex items-center space-x-1"
                onClick={handleDetailClick}
              >
                <Info size={14} />
                <span>상세 보기</span>
              </button>
              
              <button 
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center space-x-1"
                onClick={handleSelectMeal}
              >
                <Plus size={14} />
                <span>바로 담기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <FoodDetail 
          meal={meal} 
          onClose={handleClosePopup} 
          onSelect={handleSelectMeal}
        />
      )}
    </>
  );
};

export default FoodCard;