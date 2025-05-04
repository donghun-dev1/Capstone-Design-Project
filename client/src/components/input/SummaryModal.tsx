import React from 'react';
import { DietRecommendation } from '@shared/schema';
import usePreviewStore from '@/stores/usePreviewStore';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

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
  
  // 영양소 분포 계산
  const proteinPercentage = Math.round((summary.totalProtein * 4) / summary.totalCalories * 100);
  const carbsPercentage = Math.round((summary.totalCarbs * 4) / summary.totalCalories * 100);
  const fatPercentage = Math.round((summary.totalFat * 9) / summary.totalCalories * 100);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => {}} />
      
      {/* Modal content */}
      <div className="relative bg-gradient-to-br from-card/95 to-card/90 rounded-2xl shadow-xl max-w-lg w-full mx-4 overflow-hidden border border-white/10 backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-lg"></div>
        
        {/* Modal header */}
        <div className="p-6 border-b border-border/20">
          <h3 className="text-2xl font-bold text-foreground flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              영양 요약 정보
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium">
              미리보기
            </span>
          </h3>
        </div>
        
        {/* Modal body */}
        <div className="p-6">
          {/* 칼로리 & 예산 정보 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-background/40 border border-border/20 backdrop-blur-sm flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">칼로리</span>
              <span className="text-2xl font-bold">{summary.totalCalories}</span>
              <span className="text-xs text-muted-foreground">kcal/일</span>
            </div>
            <div className="p-4 rounded-xl bg-background/40 border border-border/20 backdrop-blur-sm flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">예산</span>
              <span className="text-2xl font-bold">₩{summary.totalBudget.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">원/일</span>
            </div>
          </div>
          
          {/* 영양소 분포 */}
          <div className="mb-6 space-y-3 p-4 rounded-xl bg-background/40 border border-border/20 backdrop-blur-sm">
            <h4 className="text-sm font-medium mb-2">영양소 분포</h4>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span className="font-medium flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 inline-block mr-1"></span> 
                  단백질
                </span>
                <span className="text-muted-foreground">{summary.totalProtein}g ({proteinPercentage}%)</span>
              </div>
              <Progress value={proteinPercentage} className="h-2 bg-background progress-protein" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span className="font-medium flex items-center">
                  <span className="h-2 w-2 rounded-full bg-amber-500 inline-block mr-1"></span> 
                  탄수화물
                </span>
                <span className="text-muted-foreground">{summary.totalCarbs}g ({carbsPercentage}%)</span>
              </div>
              <Progress value={carbsPercentage} className="h-2 bg-background progress-carbs" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span className="font-medium flex items-center">
                  <span className="h-2 w-2 rounded-full bg-rose-500 inline-block mr-1"></span> 
                  지방
                </span>
                <span className="text-muted-foreground">{summary.totalFat}g ({fatPercentage}%)</span>
              </div>
              <Progress value={fatPercentage} className="h-2 bg-background progress-fat" />
            </div>
          </div>
          
          {/* 영양 분석 */}
          <div className="p-4 mb-6 rounded-xl bg-background/40 border border-border/20 backdrop-blur-sm">
            <h4 className="text-sm font-medium mb-2">영양 분석</h4>
            <p className="text-sm text-muted-foreground">
              {summary.nutritionAnalysis}
            </p>
          </div>
          
          {/* 추천 사항 */}
          <div className="p-4 mb-6 rounded-xl bg-background/40 border border-border/20 backdrop-blur-sm">
            <h4 className="text-sm font-medium mb-2">추천 사항</h4>
            <ul className="space-y-2">
              {summary.recommendations.map((recommendation, idx) => (
                <li key={idx} className="flex text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={onContinue}
              className="flex items-center justify-center space-x-2 main-input__submit-btn hover:shadow-lg transition-all duration-300 group"
              aria-label="확인하고 식단 추천 받기"
            >
              <span>확인하고 식단 추천 받기</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
