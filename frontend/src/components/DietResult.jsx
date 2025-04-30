import React from 'react';
import styled from '@emotion/styled';
import RadialProgressChart from './RadialProgressChart';

// 가상의 데이터
const mockData = {
  summary: {
    calories: { current: 1200, target: 2000 },
    protein: { current: 65, target: 100 },
    fat: { current: 40, target: 70 },
    carbs: { current: 200, target: 250 },
    budget: { current: 7500, target: 10000 },
  },
  allergies: ['땅콩', '새우']
};

const calculatePercentage = (current, target) => Number(((current / target) * 100).toFixed(1));

const DietResult = () => {
  const chartData = [
    {
      name: '칼로리',
      percentage: calculatePercentage(mockData.summary.calories.current, mockData.summary.calories.target),
      fill: '#8884d8',
      value: `${mockData.summary.calories.current}/${mockData.summary.calories.target} kcal`
    },
    {
      name: '단백질',
      percentage: calculatePercentage(mockData.summary.protein.current, mockData.summary.protein.target),
      fill: '#83a6ed',
      value: `${mockData.summary.protein.current}/${mockData.summary.protein.target}g`
    },
    {
      name: '지방',
      percentage: calculatePercentage(mockData.summary.fat.current, mockData.summary.fat.target),
      fill: '#8dd1e1',
      value: `${mockData.summary.fat.current}/${mockData.summary.fat.target}g`
    },
    {
      name: '탄수화물',
      percentage: calculatePercentage(mockData.summary.carbs.current, mockData.summary.carbs.target),
      fill: '#82ca9d',
      value: `${mockData.summary.carbs.current}/${mockData.summary.carbs.target}g`
    },
    {
      name: '예산',
      percentage: calculatePercentage(mockData.summary.budget.current, mockData.summary.budget.target),
      fill: '#a4de6c',
      value: `${mockData.summary.budget.current}/${mockData.summary.budget.target}원`
    }
  ];

  const handleSaveToTxt = () => {
    const content = `식단 요약 리포트\n
날짜: ${new Date().toLocaleDateString()}\n
칼로리: ${mockData.summary.calories.current}/${mockData.summary.calories.target} kcal
단백질: ${mockData.summary.protein.current}/${mockData.summary.protein.target}g
지방: ${mockData.summary.fat.current}/${mockData.summary.fat.target}g
탄수화물: ${mockData.summary.carbs.current}/${mockData.summary.carbs.target}g
예산: ${mockData.summary.budget.current}/${mockData.summary.budget.target}원\n
알레르기 주의 항목: ${mockData.allergies.join(', ')}`;

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
    <Container>
      <Title>오늘의 식단 결과</Title>
      
      <ContentWrapper>
        <ChartSection>
          <RadialProgressChart
            data={chartData}
            chartTitle="목표 대비 영양소 섭취 현황"
            chartSubtitle="각 영양소의 일일 권장량 대비 섭취 비율을 보여줍니다"
          />
        </ChartSection>

        <SummarySection>
          <SummaryTitle>영양소 상세 정보</SummaryTitle>
          {chartData.map((item) => (
            <SummaryItem key={item.name}>
              <SummaryLabel>{item.name}</SummaryLabel>
              <SummaryValue>{item.value}</SummaryValue>
              <ProgressBar percentage={item.percentage}>
                <ProgressFill percentage={item.percentage} color={item.fill} />
              </ProgressBar>
            </SummaryItem>
          ))}
        </SummarySection>
      </ContentWrapper>

      {mockData.allergies.length > 0 && (
        <AllergyWarning>
          <WarningIcon>⚠️</WarningIcon>
          <WarningText>
            <strong>알레르기 주의 항목:</strong> {mockData.allergies.join(', ')}
          </WarningText>
        </AllergyWarning>
      )}

      <SaveButton onClick={handleSaveToTxt}>
        식단 요약 저장하기 (.txt)
      </SaveButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const ChartSection = styled.div`
  flex: 1;
  min-height: 600px;
  border-right: 1px solid #eee;
`;

const SummarySection = styled.div`
  flex: 0 0 350px;
  padding: 1rem;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
`;

const SummaryItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SummaryLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const SummaryValue = styled.div`
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => Math.min(props.percentage, 100)}%;
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.3s ease;
`;

const AllergyWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff3f3;
  border: 1px solid #ffcdd2;
  color: #c62828;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin: 2rem 0;
  gap: 1rem;
`;

const WarningIcon = styled.span`
  font-size: 1.5rem;
`;

const WarningText = styled.p`
  margin: 0;
  font-size: 1rem;
  
  strong {
    margin-right: 0.5rem;
  }
`;

const SaveButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 2.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default DietResult; 