import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResponsivePie } from "@nivo/pie";

// 추가 차트 파일
import {
  // PieChart,
  // Pie,
  // Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// stores 폴더 파일에서 데이터 가져오기
import useRecommendStore from "../stores/useRecommendStore";
import useSelectedMealsStore from "../stores/useSelectedMealsStore";

// 상태값은 컴포넌트 함수 안에서 가져와야 하는 리엑트 규칙이 있어서 DietResult 함수 안에 넣음
const DietResult = () => {
  const { recommendation } = useRecommendStore();
  const { selectedMeals } = useSelectedMealsStore();

  // 선댁한 식단 영양소 합산하기

  const nutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  selectedMeals.forEach(meal => {
    if (meal) {
      nutrition.calories += meal.calories || 0;
      nutrition.protein += meal.protein || 0;
      nutrition.carbs += meal.carbs || 0;
      nutrition.fat += meal.fat || 0;
    }
  });

  // 차트용 데이터 가공하기
  // 1. 퍼센트 차트용 (PieChart)
  const pieData = [
    {
      id: "칼로리",
      label: "칼로리",
      value: (nutrition.calories / (recommendation?.summary?.totalCalories || 1)) * 100,
    },
    {
      id: "단백질",
      label: "단백질",
      value: (nutrition.protein / (recommendation?.summary?.totalProtein || 1)) * 100,
    },
    {
      id: "탄수화물",
      label: "탄수화물",
      value: (nutrition.carbs / (recommendation?.summary?.totalCarbs || 1)) * 100,
    },
    {
      id: "지방",
      label: "지방",
      value: (nutrition.fat / (recommendation?.summary?.totalFat || 1)) * 100,
    },
  ];

  // 2. 목표 대비 차트용(BarChart)
  const nutritionComparisonData = [
    {
      name: "칼로리",
      current: nutrition.calories,
      target: recommendation?.summary?.totalCalories ?? 0,
      unit: "kcal",
    },
    {
      name: "단백질",
      current: nutrition.protein,
      target: recommendation?.summary?.totalProtein ?? 0,
      unit: "g",
    },
    {
      name: "탄수화물",
      current: nutrition.carbs,
      target: recommendation?.summary?.totalCarbs ?? 0,
      unit: "g",
    },
    {
      name: "지방",
      current: nutrition.fat,
      target: recommendation?.summary?.totalFat ?? 0,
      unit: "g",
    },
  ];

  console.log("pieData", pieData);
  console.log("nutritionComparisonData", nutritionComparisonData);

  // <차트 자리에 임시로 표시해줄 컴포넌트 PlaceholderChart를 정의>
  // const PlaceholderChart = ({ label }: { label: string }) => (
  //   <div className="h-48 bg-gray-100 flex items-center justify-center rounded-md">
  //     <span className="text-gray-500">{label} 차트</span>
  //   </div>
  // );

  return (
    <div className="p-6 space-y-6">
      {/* 상단 제목 */}
      <h1 className="text-3xl font-bold text-center">오늘의 식단 결과</h1>

      {/* 카드 영역 */}
      <div
        className="grid gap-6 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {/* 카드 1 */}
        <Card className="w-full max-w-[600px] lg:h-[500px] xl:transform xl:translate-x-[300px] xl:translate-y-[20px]">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">목표 대비 영양소 섭취 현황</h2>
            <p className="text-sm text-muted-foreground mt-1">
              이 영양소의 일일 권장량 대비 섭취 비율을 보여줍니다.
            </p>
            <Separator className="my-4" />
            {/* <PlaceholderChart label="영양소 비율" /> */}
            <div className="h-[200px]">
              <div style={{ height: 400 }}>
                <ResponsivePie
                  data={pieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.6}
                  padAngle={1.5}
                  cornerRadius={4}
                  activeOuterRadiusOffset={8}
                  colors={{ scheme: "set2" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 카드 2 */}
        <Card className="w-full max-w-[600px] lg:h-[500px] xl:transform xl:translate-y-[20px]">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">영양소 상세 정보</h2>
            <Separator className="my-4" />
            {/* <PlaceholderChart label="상세 정보" /> */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutritionComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#82ca9d" name="현재 섭취량" />
                  <Bar dataKey="target" fill="#8884d8" name="목표 섭취량" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietResult;
