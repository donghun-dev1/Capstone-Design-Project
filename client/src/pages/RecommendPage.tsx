import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import useRecommendStore from '@/stores/useRecommendStore';
import useSelectedMealsStore from '@/stores/useSelectedMealsStore';
import { Meal } from '@shared/schema';
import FoodCard from '@/components/recommend/FoodCard';
import LeftBox from '@/components/recommend/LeftBox';
import RightInfoBox from '@/components/recommend/RightInfoBox';
import BottomBar from '@/components/recommend/BottomBar';
import LoadingOverlay from '@/components/input/LoadingOverlay';

/**
 * Page to display diet recommendations based on user input
 */
const RecommendPage: React.FC = () => {
  const [location, navigate] = useLocation();
  
  // Zustand 스토어에서 상태 및 액션 가져오기
  const { 
    recommendation, 
    meals, 
    isLoading, 
    error,
    refreshMeals 
  } = useRecommendStore();
  
  const { 
    selectedMeals, 
    selectMeal, 
    removeMeal 
  } = useSelectedMealsStore();
  
  // 초기 로딩 시 데이터 없으면 메인 페이지로 이동
  useEffect(() => {
    if (!recommendation && !isLoading) {
      navigate('/');
    }
  }, [recommendation, isLoading, navigate]);
  
  // 다음 단계로 이동
  const handleNext = () => {
    const hasAnyMealSelected = selectedMeals.some(meal => meal !== null);
    
    if (!hasAnyMealSelected) {
      alert('적어도 하나의 식단을 선택해주세요.');
      return;
    }
    
    navigate('/meal-plan');
  };
  
  // 식단 새로 추천 요청
  const handleRefresh = () => {
    refreshMeals();
  };
  
  // 식단 클릭 시 선택 처리
  const handleSelectMeal = (meal: Meal) => {
    selectMeal(meal);
  };
  
  // 선택된 식단 제거
  const handleRemoveMeal = (index: number) => {
    removeMeal(index);
  };
  
  // 로딩 중이고 데이터가 없는 경우 로딩 표시
  if (isLoading && (!recommendation || !recommendation.meals.length)) {
    return <LoadingOverlay isVisible={true} message="추천 식단을 가져오는 중입니다" />;
  }
  
  // 데이터가 없는 경우 처리
  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg mb-4">추천 정보를 불러올 수 없습니다.</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate('/')}
          >
            입력 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen pb-20 pt-6">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">추천 식단</h1>
          <p className="text-gray-600 dark:text-gray-400">
            당신의 목표에 맞는 식단을 선택해 보세요
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 좌측 패널 */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <LeftBox
              selectedMeals={selectedMeals}
              onRemove={handleRemoveMeal}
            />
          </div>
          
          {/* 중앙 식단 카드 그리드 */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {recommendation.meals.map((meal) => (
                <FoodCard
                  key={meal.id}
                  meal={meal}
                  onSelect={handleSelectMeal}
                />
              ))}
            </div>
          </div>
          
          {/* 우측 영양 정보 */}
          <div className="lg:col-span-3 order-3">
            <RightInfoBox
              summary={recommendation?.summary}
              selectedMeals={selectedMeals}
            />
          </div>
        </div>
      </div>
      
      {/* 하단 고정 바 */}
      <BottomBar
        currentStep={2}
        totalSteps={4}
        onRefresh={handleRefresh}
        onNext={handleNext}
        refreshDisabled={isLoading}
        nextDisabled={isLoading || !selectedMeals.some(meal => meal !== null)}
      />
      
      {/* 로딩 오버레이 */}
      <LoadingOverlay isVisible={isLoading && recommendation?.meals.length > 0} />
    </main>
  );
};

export default RecommendPage;
