import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// 가상의 데이터
const mockData = {
  calories: { current: 1800, target: 2000, percentage: 90 },
  protein: { current: 80, target: 100, percentage: 80 },
  fat: { current: 60, target: 65, percentage: 92 },
  carbs: { current: 220, target: 250, percentage: 88 },
  budget: { current: 15000, target: 20000, percentage: 75 },
  allergies: ['땅콩', '새우']
};

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
칼로리: ${mockData.calories.current}/${mockData.calories.target} kcal (${mockData.calories.percentage}%)
단백질: ${mockData.protein.current}/${mockData.protein.target}g (${mockData.protein.percentage}%)
지방: ${mockData.fat.current}/${mockData.fat.target}g (${mockData.fat.percentage}%)
탄수화물: ${mockData.carbs.current}/${mockData.carbs.target}g (${mockData.carbs.percentage}%)
예산: ${mockData.budget.current}/${mockData.budget.target}원 (${mockData.budget.percentage}%)
알레르기 주의: ${mockData.allergies.join(', ')}`;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '식단_요약.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderDonutChart = (data, title, hasAllergy = false) => (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={createChartData(data)}
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
      <p>{data}%</p>
    </div>
  );

  return (
    <div className="diet-summary">
      <h2>오늘의 식단 요약</h2>
      <div className="charts-grid">
        {renderDonutChart(mockData.calories.percentage, '칼로리')}
        {renderDonutChart(mockData.protein.percentage, '단백질')}
        {renderDonutChart(mockData.fat.percentage, '지방')}
        {renderDonutChart(mockData.carbs.percentage, '탄수화물')}
        {renderDonutChart(mockData.budget.percentage, '예산')}
        {renderDonutChart(100, '알레르기', mockData.allergies.length > 0)}
      </div>
      
      <div className="allergies-warning">
        {mockData.allergies.length > 0 && (
          <p className="warning">⚠️ 알레르기 주의: {mockData.allergies.join(', ')}</p>
        )}
      </div>
      
      <button onClick={downloadSummary} className="download-button">
        식단 요약 다운로드
      </button>
    </div>
  );
};

export default DietSummary; 