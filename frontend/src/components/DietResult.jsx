import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import RadialProgressChart from './RadialProgressChart';
import PieRatioChart from './PieRatioChart';
import NutrientGaugeChart from './NutrientGaugeChart';
import NutrientRatioProgressBar from './NutrientRatioProgressBar';
import { AppBackground, MainCard, Container, Title, Button, WarningContainer, COLORS, cardStyle, CenteredButtonWrapper, MainButton, AnalysisSection, Card, CardGrid, CardTitle, NutrientLabel, NutrientValue, ProgressBar, Progress } from '../styles/common';
import { fetchDietData } from '../api/dietApi';
import { nutrientNames } from '../constants/nutrients';
import { calculatePercentage, getNutrientColor } from '../utils/dietUtils';

const DietResult = () => {
  const navigate = useNavigate();
  // 상태를 상위에서 관리
  const [summary, setSummary] = useState(null);
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    fetchDietData().then(data => {
      setSummary(data.summary);
      setAllergies(data.allergies);
    });
  }, []);

  if (!summary) return <div>로딩중...</div>;

  // 차트 데이터 생성
  const chartData = nutrientNames.map(n => ({
    name: n.label,
    percentage: calculatePercentage(summary[n.key].current, summary[n.key].target),
    fill: getNutrientColor(n.key),
    value: `${summary[n.key].current}/${summary[n.key].target} ${n.unit}`
  }));

  // 차트에서 값이 바뀔 때 호출되는 함수 (예시)
  const handleChartChange = (nutrientKey, newCurrent) => {
    setSummary(prev => ({
      ...prev,
      [nutrientKey]: {
        ...prev[nutrientKey],
        current: newCurrent
      }
    }));
  };

  // 저장 함수는 기존과 동일
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <MainCard>
          <Header>
            <StyledTitle>오늘의 식단 결과</StyledTitle>
            <HomeLink onClick={() => navigate('/')}>
              홈으로
            </HomeLink>
          </Header>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <ContentWrapper>
              <ChartSection>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>목표 대비 영양소 섭취 현황</h2>
                  <div style={{ textAlign: 'center', color: '#888', fontSize: 16, marginBottom: 24 }}>각 영양소의 일일 권장량 대비 섭취 비율을 보여줍니다</div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <RadialProgressChart
                    data={summary}
                    chartTitle={null}
                    chartSubtitle={null}
                    onChange={handleChartChange}
                    legendMarginLeft={72}
                  />
                </motion.div>
              </ChartSection>
              <Divider />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                viewport={{ once: false, amount: 0.3 }}
                style={{ width: '100%' }}
              >
                <SummarySection>
                  <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginBottom: 24 }}>영양소 상세 정보</h2>
                  {nutrientNames.map((n, idx) => (
                    <SummaryItem key={n.key}>
                      <NutrientLabel>{n.label}</NutrientLabel>
                      <NutrientValue color={getNutrientColor(n.key)}>{summary[n.key].current}/{summary[n.key].target} {n.unit}</NutrientValue>
                      <DetailProgressBar>
                        <Progress color={getNutrientColor(n.key)} percent={Math.round((summary[n.key].current / summary[n.key].target) * 100)} />
                      </DetailProgressBar>
                    </SummaryItem>
                  ))}
                </SummarySection>
              </motion.div>
            </ContentWrapper>
          </motion.div>
          {/* 분석/추가 시각화 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <AnalysisSection>
              <div style={{ width: '100%' }}>
                <NutrientGaugeChart summary={summary} />
              </div>
              <div style={{ display: 'flex', gap: '2.5rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
                <div style={{ flex: 1, minWidth: 340 }}>
                  <NutrientRatioProgressBar summary={summary} />
                </div>
              </div>
            </AnalysisSection>
          </motion.div>
          {allergies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <WarningContainer>
                <span>
                  <span style={{ fontWeight: 700, fontSize: '1.08em', marginRight: 4 }}>
                    알레르기 주의 항목:
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {allergies.join(', ')}
                  </span>
                </span>
              </WarningContainer>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CenteredButtonWrapper>
              <MainButton onClick={handleSaveToTxt}>
                식단 요약 저장하기 (.txt) <span style={{fontSize: '1.3em'}}>→</span>
              </MainButton>
            </CenteredButtonWrapper>
          </motion.div>
        </MainCard>
      </motion.div>
    </AppBackground>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  gap: 3.5rem;
  margin-bottom: 3rem;
  border-radius: 12px;
  background: transparent;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  margin-top: 3rem;
  align-items: stretch;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0 10px;
    align-items: stretch;
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
  margin-left: 0px;
  @media (max-width: 900px) {
    flex: none;
    width: 100%;
    align-items: center;
    max-width: 100%;
    margin-left: 0;
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
  margin-bottom: 2.2rem;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 진행바(영양소 상세 정보 전용)
const DetailProgressBar = styled.div`
  width: 280%;
  max-width: 300px;
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  position: relative;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0;
`;

const HomeLink = styled.div`
  cursor: pointer;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: absolute;
  right: 20px;
  
  &:hover {
    color: #333;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default DietResult;