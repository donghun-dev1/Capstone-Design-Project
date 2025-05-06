import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import useRecommendStore from '@/stores/useRecommendStore';
import useSelectedMealsStore from '@/stores/useSelectedMealsStore';
import { Meal } from '@shared/schema';
import FoodCard from '@/components/recommend/FoodCard';
import LeftBox from '@/components/recommend/LeftBox';
import RightInfoBox from '@/components/recommend/RightInfoBox';
import BottomBar from '@/components/recommend/BottomBar';
import LoadingOverlay from '@/components/input/LoadingOverlay';
import NutritionVisualization from '@/components/recommend/NutritionVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Page to display diet recommendations based on user input
 */
const RecommendPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('foods');
  
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
    
    navigate('/configure');
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
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* 좌측 패널 - 선택한 식단 */}
          <div className="w-full md:w-1/4">
            <LeftBox
              selectedMeals={selectedMeals}
              onRemove={handleRemoveMeal}
            />
          </div>
          
          {/* 중앙 영역 - 탭으로 식단 목록과 영양소 시각화 전환 */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="foods" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="foods">추천 식단</TabsTrigger>
                <TabsTrigger value="nutrition">영양소 분석</TabsTrigger>
              </TabsList>
              <TabsContent value="foods">
                <div className="flex flex-col space-y-4">
                  {recommendation.meals.map((meal) => (
                    <FoodCard
                      key={meal.id}
                      meal={meal}
                      onSelect={handleSelectMeal}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="nutrition">
                {selectedMeals.some(meal => meal !== null) ? (
                  <NutritionVisualization 
                    summary={recommendation.summary}
                    selectedMeals={selectedMeals}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md p-4">
                    <div className="text-center">
                      <p className="text-lg text-gray-500 mb-4">식단을 선택하면 영양소 분석이 표시됩니다</p>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => setActiveTab('foods')}
                      >
                        식단 선택하기
                      </button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* 우측 영양 정보 */}
          <div className="w-full md:w-1/6">
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
