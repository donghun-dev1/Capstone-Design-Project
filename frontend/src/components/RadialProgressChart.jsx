import React from 'react';
import styled from '@emotion/styled';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p className="label">{payload[0].payload.name}</p>
        <p className="value">{payload[0].payload.value}</p>
        <p className="percentage">{`달성률: ${payload[0].value.toFixed(1)}%`}</p>
      </TooltipContainer>
    );
  }
  return null;
};

const RadialProgressChart = ({
  data,
  width = '100%',
  height = 600,
  innerRadius = '30%',
  outerRadius = '90%',
  startAngle = 180,
  endAngle = -180,
  minAngle = 15,
  showLegend = true,
  showTooltip = true,
  legendPosition = 'right',
  chartTitle,
  chartSubtitle,
}) => {
  return (
    <ChartWrapper>
      <ChartHeader>
        {chartTitle && <ChartTitle>{chartTitle}</ChartTitle>}
        {chartSubtitle && <ChartSubtitle>{chartSubtitle}</ChartSubtitle>}
      </ChartHeader>
      <ChartContainer>
        <ResponsiveContainer width={width} height={height}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            data={data}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <RadialBar
              minAngle={minAngle}
              background
              clockWise={true}
              dataKey="percentage"
              cornerRadius={5}
              label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }}
            />
            {showLegend && (
              <Legend
                iconSize={15}
                layout="vertical"
                verticalAlign="middle"
                align={legendPosition}
                wrapperStyle={{
                  paddingLeft: '20px',
                  fontSize: '14px'
                }}
              />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ChartHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h2`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ChartSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TooltipContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin: 0.3rem 0;
    &.label {
      font-weight: bold;
      color: #333;
    }
    &.value {
      color: #666;
    }
    &.percentage {
      color: #888;
      font-size: 0.9rem;
    }
  }
`;

export default RadialProgressChart; 