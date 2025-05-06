import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Info, Plus, X, BarChart } from 'lucide-react';
import { Meal } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import FoodCard from '@/components/recommend/FoodCard';
import useRecommendStore from '@/stores/useRecommendStore';
import useUserInfoStore from '@/stores/useUserInfoStore';
import { useMealPlanStore } from '@/stores/useMealPlanStore';
import NutritionVisualization from '@/components/recommend/NutritionVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MealSlot = 'breakfast' | 'lunch' | 'dinner';

const MealConfigPage: React.FC = () => {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('meals');
  const { toast } = useToast();
  const { recommendation } = useRecommendStore();
  const { userInfo } = useUserInfoStore();
  
  // 임시로 하드코딩된 식단 및 영양소 데이터
  const meals = {
    breakfast: [],
    lunch: [],
    dinner: []
  };
  
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    budget: 0
  };
  
  const addMeal = (slot: MealSlot, meal: Meal) => {
    console.log('Add meal', slot, meal);
    // 실제 구현에서는 useMealPlanStore에서 가져온 함수를 사용
  };
  
  const removeMeal = (slot: MealSlot, index: number) => {
    console.log('Remove meal', slot, index);
    // 실제 구현에서는 useMealPlanStore에서 가져온 함수를 사용
  };
  
  const moveMeal = (fromSlot: MealSlot, fromIndex: number, toSlot: MealSlot, toIndex: number) => {
    console.log('Move meal', fromSlot, fromIndex, toSlot, toIndex);
    // 실제 구현에서는 useMealPlanStore에서 가져온 함수를 사용
  };
  
  const resetMeals = () => {
    console.log('Reset meals');
    // 실제 구현에서는 useMealPlanStore에서 가져온 함수를 사용
  };
  
  // Meal slots 표시를 위한 정의
  const mealSlots: MealSlot[] = ['breakfast', 'lunch', 'dinner'];
  
  // 초기 설정 - 먹는 끼니 수에 따라 빈 슬롯 생성
  useEffect(() => {
    // 컴포넌트 마운트 시 기존 식단 초기화
    resetMeals();
  }, [resetMeals]);
  
  // 현재 선택된 끼니 수 (userInfo 기반)
  const activeMeals = userInfo.mealsPerDay || 3;
  
  // 끼니별 추가 요청 핸들러
  const handleAddMeal = (slot: MealSlot) => {
    if (!recommendation) {
      toast({
        title: "추천 정보가 없습니다",
        description: "식단 추천 페이지로 이동합니다.",
        variant: "destructive"
      });
      navigate('/recommend');
      return;
    }
    
    // 모달이나 사이드 패널로 추천 식단 리스트 표시
    // 잠정적으로는 첫 번째 추천 음식을 바로 추가
    if (recommendation.meals.length > 0) {
      const recommendedMeal = recommendation.meals[0];
      addMeal(slot, recommendedMeal);
    }
  };
  
  // 음식 삭제 핸들러
  const handleRemoveMeal = (slot: MealSlot, index: number) => {
    removeMeal(slot, index);
  };
  
  // 음식 이동/변경 핸들러 (drag & drop)
  const handleMoveMeal = (fromSlot: MealSlot, fromIndex: number, toSlot: MealSlot, toIndex: number) => {
    moveMeal(fromSlot, fromIndex, toSlot, toIndex);
  };
  
  // 음식 선택 핸들러 (FoodCard에서 사용)
  const handleSelectMeal = (meal: Meal, slot: MealSlot) => {
    // 현재 슬롯의 마지막에 추가
    addMeal(slot, meal);
  };
  
  // 다음 페이지로 진행 (결과 확인)
  const handleViewResults = () => {
    // 기본 검증 - 각 슬롯에 최소 하나의 음식이 있어야 함
    const hasEmptyActiveSlots = mealSlots.slice(0, activeMeals).some(slot => meals[slot].length === 0);
    
    if (hasEmptyActiveSlots) {
      toast({
        title: "빈 식단이 있습니다",
        description: "모든 끼니에 최소 하나의 음식을 추가해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    // 영양소 검증
    const summary = recommendation?.summary;
    if (summary) {
      // 칼로리가 목표의 90% 미만이거나 110% 초과인 경우 경고
      const calorieRatio = totals.calories / summary.totalCalories;
      if (calorieRatio < 0.9 || calorieRatio > 1.1) {
        toast({
          title: "칼로리 균형이 맞지 않습니다",
          description: "목표 칼로리의 90~110% 범위로 구성하는 것이 좋습니다.",
          variant: "destructive"
        });
        return;
      }
      
      // 단백질이 목표의 80% 미만인 경우 경고
      if (totals.protein < summary.totalProtein * 0.8) {
        toast({
          title: "단백질이 부족합니다",
          description: "단백질이 목표치의 80% 이상이 되도록 구성해주세요.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // 검증 통과 시 다음 페이지로 이동
    navigate('/summary');
  };
  
  // 목표 영양소 계산 (추천 데이터 기반)
  const targets = {
    calories: recommendation?.summary?.totalCalories || 2000,
    protein: recommendation?.summary?.totalProtein || 100,
    carbs: recommendation?.summary?.totalCarbs || 250,
    fat: recommendation?.summary?.totalFat || 70,
    budget: recommendation?.summary?.totalBudget || 20000
  };
  
  // 영양소 진행률 계산
  const progress = {
    calories: Math.min(100, (totals.calories / targets.calories) * 100),
    protein: Math.min(100, (totals.protein / targets.protein) * 100),
    carbs: Math.min(100, (totals.carbs / targets.carbs) * 100),
    fat: Math.min(100, (totals.fat / targets.fat) * 100),
    budget: Math.min(100, (totals.budget / targets.budget) * 100)
  };
  
  return (
    <main className="min-h-screen pb-24">
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        <h1 className="text-3xl font-bold mb-8">식단 구성하기</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 왼쪽 패널 - 탭으로 식단 구성과 영양소 분석을 전환할 수 있는 영역 */}
          <div className="flex-grow">
            <Tabs defaultValue="meals" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="meals" className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  식단 구성
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex items-center">
                  <BarChart size={16} className="mr-2" />
                  영양소 분석
                </TabsTrigger>
              </TabsList>
              
              {/* 식단 구성 탭 */}
              <TabsContent value="meals">
                <div className="space-y-8">
                  {mealSlots.slice(0, activeMeals).map((slot) => (
                    <div key={slot} className={`meal-slot p-6 rounded-xl bg-white shadow-md`}>
                      <h2 className="text-xl font-semibold mb-4 capitalize">
                        {slot === 'breakfast' ? '아침' : slot === 'lunch' ? '점심' : '저녁'}
                      </h2>
                      
                      {meals[slot].length === 0 ? (
                        <div 
                          className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleAddMeal(slot)}
                        >
                          <div className="text-center">
                            <Plus size={30} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">음식 추가하기</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {meals[slot].map((meal: Meal, index: number) => (
                            <div key={`${slot}-${index}`} className="relative">
                              <button 
                                className="absolute top-2 right-2 z-10 bg-red-50 text-red-500 p-1 rounded-full hover:bg-red-100 transition-colors"
                                onClick={() => handleRemoveMeal(slot, index)}
                              >
                                <X size={16} />
                              </button>
                              
                              <FoodCard 
                                meal={meal} 
                                onSelect={(meal) => handleSelectMeal(meal, slot)} 
                              />
                            </div>
                          ))}
                          
                          <div 
                            className="flex items-center justify-center h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleAddMeal(slot)}
                          >
                            <Plus size={20} className="text-gray-400 mr-2" />
                            <span className="text-gray-500 text-sm">더 추가하기</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* 영양소 분석 탭 */}
              <TabsContent value="nutrition">
                {Object.values(meals).some(mealList => mealList.length > 0) ? (
                  <NutritionVisualization 
                    summary={{
                      totalCalories: targets.calories,
                      totalProtein: targets.protein,
                      totalCarbs: targets.carbs,
                      totalFat: targets.fat,
                      totalBudget: targets.budget,
                      nutritionAnalysis: "",
                      recommendations: []
                    }}
                    selectedMeals={Object.values(meals).flat()}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md p-4">
                    <div className="text-center">
                      <p className="text-lg text-gray-500 mb-4">식단을 추가하면 영양소 분석이 표시됩니다</p>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => setActiveTab('meals')}
                      >
                        식단 구성하기
                      </button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* 오른쪽 요약 패널 */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">영양 요약</h2>
              
              <div className="mb-8">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">예산</span>
                  <span className="text-sm text-gray-600">
                    {totals.budget.toLocaleString()}원 / {targets.budget.toLocaleString()}원
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${progress.budget > 100 ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${progress.budget}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* 칼로리 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">칼로리</span>
                    <span className="text-sm text-gray-600">
                      {totals.calories.toLocaleString()} / {targets.calories.toLocaleString()} kcal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${progress.calories > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${progress.calories}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 단백질 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">단백질</span>
                    <span className="text-sm text-gray-600">
                      {totals.protein.toLocaleString()} / {targets.protein.toLocaleString()} g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${progress.protein > 100 ? 'bg-red-500' : 'bg-red-500'}`}
                      style={{ width: `${progress.protein}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 탄수화물 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">탄수화물</span>
                    <span className="text-sm text-gray-600">
                      {totals.carbs.toLocaleString()} / {targets.carbs.toLocaleString()} g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${progress.carbs > 100 ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${progress.carbs}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 지방 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">지방</span>
                    <span className="text-sm text-gray-600">
                      {totals.fat.toLocaleString()} / {targets.fat.toLocaleString()} g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${progress.fat > 100 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${progress.fat}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 하단 내비게이션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">1</div>
              <div className="ml-2 text-sm text-gray-500">입력</div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">2</div>
              <div className="ml-2 text-sm text-gray-500">추천</div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">3</div>
              <div className="ml-2 text-sm font-medium">구성</div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">4</div>
              <div className="ml-2 text-sm text-gray-500">요약</div>
            </div>
          </div>
          
          <button 
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            onClick={handleViewResults}
          >
            결과 확인
          </button>
        </div>
      </div>
    </main>
  );
};

export default MealConfigPage;