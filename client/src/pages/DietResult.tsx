import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import RadialProgressChart from '@/components/4pagecomponents/RadialProgressChart';
import PieRatioChart from '@/components/4pagecomponents/PieRatioChart';
import NutrientGaugeChart from '@/components/4pagecomponents/NutrientGaugeChart';
import NutrientRatioProgressBar from '@/components/4pagecomponents/NutrientRatioProgressBar';
import MealStackedBarChart from '@/components/4pagecomponents/MealStackedBarChart';
import {
  AppBackground, MainCard, Title, WarningContainer,
  CenteredButtonWrapper, MainButton, AnalysisSection,
  NutrientLabel, NutrientValue
} from '@/styles/common';
import { fetchDietData } from '@/api/4pageapi/dietApi';
import { nutrientNames } from '@/constants/nutrients';
import { calculatePercentage, getNutrientColor } from '@/utils/dietUtils';

interface Nutrient {
  current: number;
  target: number;
  unit: string;
}

interface Summary {
  calories: Nutrient;
  protein: Nutrient;
  fat: Nutrient;
  carbs: Nutrient;
  budget: Nutrient;
  [key: string]: Nutrient;
}

interface Meals {
  [key: string]: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

const DietResult: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [meals, setMeals] = useState<Meals | null>(null);

  useEffect(() => {
    fetchDietData().then((data: any) => {
      setSummary(data.summary);
      setAllergies(data.allergies);
      setMeals(data.meals);
    });
  }, []);

  if (!summary || !meals) return <div>로딩중...</div>;

  const handleSaveToTxt = () => {
    const content = `식단 요약 리포트\n\n날짜: ${new Date().toLocaleDateString()}\n\n칼로리: ${summary.calories.current}/${summary.calories.target} kcal\n단백질: ${summary.protein.current}/${summary.protein.target}g\n지방: ${summary.fat.current}/${summary.fat.target}g\n탄수화물: ${summary.carbs.current}/${summary.carbs.target}g\n예산: ${summary.budget.current}/${summary.budget.target}원\n\n알레르기 주의 항목: ${allergies.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '식단_요약.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AppBackground>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <MainCard>
          <Header>
            <StyledTitle>오늘의 식단 결과</StyledTitle>
          </Header>
          <ContentWrapper>
            <ChartSection>
              <h2>목표 대비 영양소 섭취 현황</h2>
              <RadialProgressChart data={summary} />
            </ChartSection>
            <Divider />
            <SummarySection>
              <h2>영양소 상세 정보</h2>
              {nutrientNames.map((n: any) => (
                <SummaryItem key={n.key}>
                  <NutrientLabel>{n.label}</NutrientLabel>
                  <NutrientValue color={getNutrientColor(n.key)}>
                    {summary[n.key].current}/{summary[n.key].target} {n.unit}
                  </NutrientValue>
                  <DetailProgressBar>
                    <ProgressBarInner
                      color={getNutrientColor(n.key)}
                      percent={Math.round((summary[n.key].current / summary[n.key].target) * 100)}
                    />
                  </DetailProgressBar>
                </SummaryItem>
              ))}
            </SummarySection>
          </ContentWrapper>
          <AnalysisSection>
            <NutrientGaugeChart summary={summary} />
            <NutrientRatioProgressBar summary={summary} />
            <MealStackedBarChart meals={meals} />
          </AnalysisSection>
          {allergies.length > 0 && (
            <WarningContainer>
              <strong>알레르기 주의 항목:</strong> {allergies.join(', ')}
            </WarningContainer>
          )}
          <CenteredButtonWrapper>
            <MainButton onClick={handleSaveToTxt}>
              식단 요약 저장하기 (.txt)
            </MainButton>
          </CenteredButtonWrapper>
        </MainCard>
      </motion.div>
    </AppBackground>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  gap: 3.5rem;
  margin: 3rem auto 0;
  padding: 0 40px;
  max-width: 1200px;
  align-items: stretch;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0 10px;
  }
`;

const ChartSection = styled.div`
  flex: 1.3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex: none;
    width: 100%;
    align-items: center;
  }
`;

const SummarySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  @media (max-width: 900px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Divider = styled.div`
  width: 2px;
  min-height: 320px;
  background: #e5e5e5;
  margin: 0 48px;
  border-radius: 2px;
  @media (max-width: 900px) {
    width: 100%;
    height: 2px;
    min-height: 0;
    margin: 32px 0;
  }
`;

const SummaryItem = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailProgressBar = styled.div`
  width: 100%;
  max-width: 300px;
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div<{ percent: number; color: string }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: ${({ color }) => color};
  transition: width 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0;
`;

export default DietResult;
