import React, { useState } from 'react';
import { Meal } from '@shared/schema';
import FoodDetail from './FoodDetail';

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
        className="food-card p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800"
        onClick={handleCardClick}
      >
        <div className="mb-3 relative rounded-lg overflow-hidden">
          <img 
            src={meal.imageUrl || '/placeholder-food.jpg'} 
            alt={meal.name}
            className="w-full h-36 object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {meal.score || 85}점
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{meal.name}</h3>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {meal.tags?.join(' · ') || '일반식 · 건강식'}
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