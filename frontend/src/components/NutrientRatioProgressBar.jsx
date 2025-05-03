import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { nutrientNames } from '../constants/nutrients';
import { ChartCard } from '../styles/common';

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
const tipColor = '#00C49F';
const tipTextColor = '#222';

const NutrientRatioRadarChart = ({ summary }) => {
  // 예산 제외 영양소만
  const nutrients = nutrientNames.filter(n => n.key !== 'budget');
  const data = nutrients.map((n, idx) => ({
    nutrient: n.label,
    percent: Math.round((summary[n.key].current / summary[n.key].target) * 100),
    color: COLORS[idx % COLORS.length]
  }));

  // Tip 생성
  const tips = [];
  if (summary.carbs && summary.carbs.current / summary.carbs.target < 0.5) {
    tips.push('탄수화물이 부족해요! 고구마, 현미밥, 통곡물 등 건강한 탄수화물 식품을 추가해보세요.');
  }
  if (summary.fat && summary.fat.current / summary.fat.target < 0.5) {
    tips.push('지방이 부족해요! 견과류, 아보카도, 올리브유 등 좋은 지방을 섭취해보세요.');
  }
  // 예산 Tip
  if (summary.budget) {
    const ratio = summary.budget.current / summary.budget.target;
    if (ratio < 0.5) {
      tips.push('예산이 부족해요! 가성비 좋은 식재료(두부, 계란, 제철 채소 등)를 활용해보세요.');
    } else if (ratio > 0.95) {
      tips.push('예산이 거의 소진됐어요! 남은 예산을 고려해 식단을 조절해보세요.');
    } else {
      tips.push('예산이 여유로워요! 다양한 식재료를 활용해 균형 잡힌 식단을 구성해보세요.');
    }
  }

  return (
    <ChartCard style={{
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 340,
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      gap: 32,
      padding: '1.5rem 1.5rem',
      justifyContent: 'center'
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24, textAlign: 'center' }}>영양소 섭취 비율</h3>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e0e7ef" />
            <PolarAngleAxis dataKey="nutrient" tick={{ fontWeight: 600, fontSize: 16, fill: '#222' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 13, fill: '#888' }} />
            <Radar
              name="섭취비율"
              dataKey="percent"
              stroke="#8884d8"
              fill="url(#colorUv)"
              fillOpacity={0.6}
              dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <Tooltip formatter={v => `${v}%`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {tips.length > 0 && (
        <div style={{
          flex: 1,
          minWidth: 220,
          maxWidth: 360,
          minHeight: 260,
          background: '#f5f6fa',
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(80, 120, 200, 0.08)',
          padding: '32px 24px',
          color: tipTextColor,
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.7,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}>
          <div style={{ fontWeight: 700, color: tipColor, marginBottom: 8 }}>Tip</div>
          {tips.map((tip, i) => <div key={i} style={{ marginBottom: 10 }}>{tip}</div>)}
          <div style={{ marginTop: 18, color: tipTextColor, fontWeight: 500 }}>
            식단의 균형을 위해 다양한 영양소를 골고루 섭취하는 것이 중요합니다.<br />
            오늘의 섭취 비율을 참고해 내일 식단을 미리 계획해보세요!
          </div>
        </div>
      )}
    </ChartCard>
  );
};

export default NutrientRatioRadarChart; 