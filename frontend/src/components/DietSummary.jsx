import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from '@emotion/styled';
import { Container, Title, ChartContainer, WarningContainer, Button, ChartsGrid } from '../styles/common';
import mockDietSummary from '../api/mockDietSummary';

const COLORS = {
  normal: '#00C49F',
  warning: '#FF0000'
};

const DietSummary = () => {
  const createChartData = (value) => [
    { name: '달성', value: value },
    { name: '미달성', value: 100 - value }
  ];

  const downloadSummary = () => {
    const summaryText = `식단 요약 리포트\n
칼로리: ${mockDietSummary.calories.current}/${mockDietSummary.calories.target} kcal (${mockDietSummary.calories.percentage}%)\n단백질: ${mockDietSummary.protein.current}/${mockDietSummary.protein.target}g (${mockDietSummary.protein.percentage}%)\n지방: ${mockDietSummary.fat.current}/${mockDietSummary.fat.target}g (${mockDietSummary.fat.percentage}%)\n탄수화물: ${mockDietSummary.carbs.current}/${mockDietSummary.carbs.target}g (${mockDietSummary.carbs.percentage}%)\n예산: ${mockDietSummary.budget.current}/${mockDietSummary.budget.target}원 (${mockDietSummary.budget.percentage}%)\n알레르기 주의: ${mockDietSummary.allergies.join(', ')}`;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '식단_요약.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderDonutChart = (value, title, hasAllergy = false) => (
    <ChartContainer>
      <h3>{title}</h3>
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={createChartData(value)}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill={hasAllergy ? COLORS.warning : COLORS.normal} />
            <Cell fill="#CCCCCC" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p>{value}%</p>
    </ChartContainer>
  );

  return (
    <Container>
      <Title>오늘의 식단 요약</Title>
      <ChartsGrid>
        {renderDonutChart(mockDietSummary.calories.percentage, '칼로리')}
        {renderDonutChart(mockDietSummary.protein.percentage, '단백질')}
        {renderDonutChart(mockDietSummary.fat.percentage, '지방')}
        {renderDonutChart(mockDietSummary.carbs.percentage, '탄수화물')}
        {renderDonutChart(mockDietSummary.budget.percentage, '예산')}
        {renderDonutChart(100, '알레르기', mockDietSummary.allergies.length > 0)}
      </ChartsGrid>
      
      {mockDietSummary.allergies.length > 0 && (
        <WarningContainer>
          알레르기 주의: {mockDietSummary.allergies.join(', ')}
        </WarningContainer>
      )}
      
      <Button onClick={downloadSummary}>
        식단 요약 다운로드
      </Button>
    </Container>
  );
};

export default DietSummary; 