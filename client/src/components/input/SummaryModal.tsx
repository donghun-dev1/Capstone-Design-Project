import React from 'react';
import { DietRecommendation } from '@shared/schema';
import usePreviewStore from '@/stores/usePreviewStore';

interface SummaryModalProps {
  isVisible: boolean;
  summary: DietRecommendation['summary'] | null;
  onContinue: () => void;
}

/**
 * Modal component for showing nutrition summary before proceeding to recommendations
 */
const SummaryModal: React.FC<SummaryModalProps> = ({ 
  isVisible, 
  summary, 
  onContinue 
}) => {
  if (!isVisible || !summary) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div className="relative bg-card rounded-lg shadow-lg max-w-lg w-full mx-4 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            영양 요약 정보
          </h3>
          
          <div className="mb-6 text-center py-4 px-2 bg-background/50 rounded-lg backdrop-blur-sm border border-border/50">
            <p className="text-sm font-medium text-foreground">
              오늘 권장 섭취 — {summary.totalCalories} kcal · 
              단백질 {summary.totalProtein}g · 
              지방 {summary.totalFat}g · 
              탄수화물 {summary.totalCarbs}g · 
              예산 ₩{summary.totalBudget.toLocaleString()}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            {summary.nutritionAnalysis}
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={onContinue}
              className="main-input__submit-btn"
              aria-label="확인하고 식단 추천 받기"
            >
              확인하고 식단 추천 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
