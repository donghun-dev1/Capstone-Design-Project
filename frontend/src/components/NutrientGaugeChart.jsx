import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { nutrientNames } from '../constants/nutrients';
import { getNutrientColor } from '../utils/dietUtils';
import { ChartCard } from '../styles/common';
import styled from '@emotion/styled';

const GaugeWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;

const GaugeLabel = styled.div`
  margin-top: 8px;
  font-weight: 700;
  font-size: 15px;
  color: #222;
`;

const GaugeValue = styled.div`
  color: ${({ color }) => color};
  font-weight: 700;
  font-size: 18px;
`;

const GaugeRemain = styled.div`
  color: #888;
  font-size: 13px;
  margin-top: 2px;
`;

const Gauge = ({ value, color, label }) => (
  <GaugeWrapper>
    <RadialBarChart
      width={120}
      height={90}
      cx={60}
      cy={60}
      innerRadius={40}
      outerRadius={55}
      barSize={14}
      data={[{ name: label, value }]}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        minAngle={15}
        background
        clockWise
        dataKey="value"
        fill={color}
        cornerRadius={7}
      />
    </RadialBarChart>
    <GaugeLabel>{label}</GaugeLabel>
    <GaugeValue color={color}>{value}%</GaugeValue>
    <GaugeRemain>목표까지 {Math.max(0, 100 - value)}% 남음</GaugeRemain>
  </GaugeWrapper>
);

const NutrientGaugeChart = ({ summary }) => {
  // 각 영양소별 목표 달성률 계산
  const gauges = nutrientNames.map(n => {
    const percent = Math.round((summary[n.key].current / summary[n.key].target) * 100);
    return {
      label: n.label,
      value: percent,
      color: getNutrientColor(n.key)
    };
  });

  return (
    <ChartCard>
      <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 16 }}>영양소 목표 달성률</h3>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {gauges.map(g => (
          <Gauge key={g.label} value={g.value} color={g.color} label={g.label} />
        ))}
      </div>
    </ChartCard>
  );
};

export default NutrientGaugeChart; 