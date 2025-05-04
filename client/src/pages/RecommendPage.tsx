import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import useRecommendStore from '@/stores/useRecommendStore';
import useUserInfoStore from '@/stores/useUserInfoStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Utensils, Info } from 'lucide-react';

/**
 * Page to display diet recommendations based on user input
 */
const RecommendPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const { recommendation, isLoading } = useRecommendStore();
  const { userInfo } = useUserInfoStore();
  
  // If no recommendation data, redirect back to input page
  useEffect(() => {
    if (!recommendation && !isLoading) {
      navigate('/');
    }
  }, [recommendation, isLoading, navigate]);
  
  // Handle if no recommendation data is available
  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p>추천 정보를 불러오는 중...</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                입력 페이지로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const { meals, summary } = recommendation;
  
  return (
    <main className="min-h-screen pb-16 pt-10">
      <div className="container mx-auto max-w-[640px] px-4">
        <header className="mb-8">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            다시 입력하기
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            맞춤형 식단 추천
          </h1>
          <p className="text-gray-600">
            입력하신 정보를 바탕으로 AI가 생성한 식단입니다
          </p>
        </header>
        
        {/* Nutrition Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">영양 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">총 칼로리</p>
                <p className="text-2xl font-bold">{summary.totalCalories} kcal</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">예산</p>
                <p className="text-2xl font-bold">{summary.totalBudget.toLocaleString()} 원</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">단백질 ({summary.totalProtein}g)</span>
                  <span className="text-sm text-gray-500">30%</span>
                </div>
                <Progress value={30} className="h-2 bg-gray-200" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">탄수화물 ({summary.totalCarbs}g)</span>
                  <span className="text-sm text-gray-500">40%</span>
                </div>
                <Progress value={40} className="h-2 bg-gray-200" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">지방 ({summary.totalFat}g)</span>
                  <span className="text-sm text-gray-500">30%</span>
                </div>
                <Progress value={30} className="h-2 bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Meals */}
        <h2 className="text-2xl font-bold mb-4">끼니별 식단 ({userInfo.mealsPerDay}끼)</h2>
        <div className="space-y-6">
          {meals.map((meal, index) => (
            <Card key={meal.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-primary" />
                  {meal.name}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {meal.calories} kcal · 단백질 {meal.protein}g · 탄수화물 {meal.carbs}g · 지방 {meal.fat}g
                </p>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium text-sm mb-1">재료</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                    {meal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                  
                  {meal.recipe && (
                    <>
                      <h4 className="font-medium text-sm mb-1">조리 방법</h4>
                      <p className="text-sm text-gray-600">{meal.recipe}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              추천 사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">{summary.nutritionAnalysis}</p>
            <ul className="space-y-2">
              {summary.recommendations.map((recommendation, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary-50 text-primary-700 h-5 w-5 text-xs font-medium mr-2 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RecommendPage;
