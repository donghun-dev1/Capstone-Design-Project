import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppBackground, MainCard, Title, MainButton, CenteredButtonWrapper } from '../styles/common';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <AppBackground>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <MainCard>
          <Title>식단 분석 및 추천 시스템</Title>
          <CenteredButtonWrapper>
            <MainButton onClick={() => navigate('/diet-result')}>
              식단 분석 시작하기 <span style={{fontSize: '1.3em'}}>→</span>
            </MainButton>
          </CenteredButtonWrapper>
        </MainCard>
      </motion.div>
    </AppBackground>
  );
};

export default MainPage; 