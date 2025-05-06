import React from 'react';
import { useLocation } from 'wouter';
import useSelectedMealsStore from '@/stores/useSelectedMealsStore';
import useRecommendStore from '@/stores/useRecommendStore';
import { ArrowLeft } from 'lucide-react';
import StepNavigationBar from '@/components/ui/StepNavigationBar';

const MealPlanPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const { selectedMeals } = useSelectedMealsStore();
  const { recommendation } = useRecommendStore();
  
  // 선택한 식단이 없으면 이전 페이지로 돌아가기
  if (!selectedMeals.some(meal => meal !== null) || !recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg mb-4">선택된 식단이 없습니다.</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate('/recommendations')}
          >
            식단 선택으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen pb-16 pt-10">
      <div className="container mx-auto max-w-[640px] px-4">
        <header className="mb-8">
          <button
            className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center"
            onClick={() => navigate('/recommendations')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            식단 선택으로 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">맞춤형 식단 계획</h1>
          <p className="text-gray-600">선택하신 식단에 대한 상세 계획을 확인하세요</p>
        </header>
        
        {/* 식단 상세 정보 */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">선택한 식단</h2>
          
          {selectedMeals.map((meal, index) => {
            if (!meal) return null;
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 h-48 md:h-full md:w-48 bg-gray-100">
                    <img 
                      src={meal.imageUrl || '/placeholder-food.jpg'}
                      alt={meal.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {meal.calories || meal.nutrition?.calories || 0} kcal · 
                      단백질 {meal.protein || meal.nutrition?.protein || 0}g · 
                      탄수화물 {meal.carbs || meal.nutrition?.carbs || 0}g · 
                      지방 {meal.fat || meal.nutrition?.fat || 0}g
                    </p>
                    

                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 종합 영양 정보 */}
        <div className="mt-10 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">영양 요약</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-1">총 칼로리</h3>
              <p className="text-xl font-bold">
                {selectedMeals.reduce((total, meal) => 
                  total + (meal ? (meal.calories || meal.nutrition?.calories || 0) : 0), 0)}
                <span className="text-sm font-normal"> kcal</span>
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-1">단백질</h3>
              <p className="text-xl font-bold">
                {selectedMeals.reduce((total, meal) => 
                  total + (meal ? (meal.protein || meal.nutrition?.protein || 0) : 0), 0)}
                <span className="text-sm font-normal"> g</span>
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-1">탄수화물</h3>
              <p className="text-xl font-bold">
                {selectedMeals.reduce((total, meal) => 
                  total + (meal ? (meal.carbs || meal.nutrition?.carbs || 0) : 0), 0)}
                <span className="text-sm font-normal"> g</span>
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-1">지방</h3>
              <p className="text-xl font-bold">
                {selectedMeals.reduce((total, meal) => 
                  total + (meal ? (meal.fat || meal.nutrition?.fat || 0) : 0), 0)}
                <span className="text-sm font-normal"> g</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* 완료 버튼 */}
        <div className="mt-10 flex justify-center">
          <button 
            className="px-8 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90"
            onClick={() => navigate('/')}
          >
            완료하고 처음으로 돌아가기
          </button>
        </div>
      </div>
      
      {/* 하단 내비게이션 바 */}
      <StepNavigationBar 
        currentStep={4} 
        onNext={() => navigate('/')}
        nextButtonText="완료하기"
      />
    </main>
  );
};

export default MealPlanPage;