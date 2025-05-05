import React, { useState } from 'react';
import { Meal } from '@shared/schema';
import { X, ShoppingBag } from 'lucide-react';

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
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {meal.tags?.join(' · ') || '일반식 · 건강식'}
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">재료</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {meal.ingredients?.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
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
  
  const handleCardClick = () => {
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handleSelectMeal = () => {
    onSelect(meal);
    setShowPopup(false);
  };
  
  return (
    <>
      <div 
        className="food-card p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800 flex flex-col md:flex-row md:h-40"
        onClick={handleCardClick}
      >
        <div className="relative rounded-lg overflow-hidden mb-3 md:mb-0 md:w-40 md:min-w-40 md:mr-4 flex-shrink-0">
          <img 
            src={meal.imageUrl || '/placeholder-food.jpg'} 
            alt={meal.name}
            className="w-full h-36 md:h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {meal.score || 85}점
          </div>
        </div>
        
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{meal.name}</h3>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {meal.tags?.join(' · ') || '일반식 · 건강식'}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 hidden md:block md:line-clamp-2">
              {meal.ingredients?.join(', ')}
            </p>
          </div>
          
          <div className="hidden md:flex justify-between mt-2">
            <div className="text-xs font-semibold">
              <span className="text-blue-500">칼로리:</span> {meal.calories}kcal
            </div>
            <div className="text-xs font-semibold">
              <span className="text-red-500">단백질:</span> {meal.protein}g
            </div>
            <div className="text-xs font-semibold">
              <span className="text-amber-500">탄수화물:</span> {meal.carbs}g
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