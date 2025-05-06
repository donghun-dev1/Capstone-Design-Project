import React from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import useUserInfoStore from '@/stores/useUserInfoStore';

interface StepNavigationBarProps {
  currentStep: 1 | 2 | 3 | 4;
  onNext?: () => void;
  nextButtonText?: string;
}

const StepNavigationBar: React.FC<StepNavigationBarProps> = ({
  currentStep,
  onNext,
  nextButtonText = '다음',
}) => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { userInfo, isFormValid } = useUserInfoStore();
  
  // 페이지 이동 핸들러 함수
  const handleNavigate = (path: string) => {
    // '추천' 페이지로 이동하려고 할 때
    if (path === '/recommendations' && currentStep === 1) {
      // 사용자 정보가 유효하지 않으면 경고 표시
      if (!isFormValid) {
        toast({
          title: "사용자 정보가 불완전합니다",
          description: "필수 정보를 모두 입력해주세요",
          variant: "destructive"
        });
        return;
      }
    }
    
    // 경고가 없거나 다른 페이지 이동은 정상 처리
    navigate(path);
  };
  
  // 커넥팅 라인 생성 - 스텝 사이의 선 만들기
  const getConnectorClass = (stepNum: number) => {
    // 현재 스텝 이전이면 활성화 상태
    if (stepNum < currentStep) return 'bg-primary/90';
    // 현재 스텝이면 활성화 상태
    if (stepNum === currentStep) return 'bg-gradient-to-r from-primary/90 to-primary/40';
    // 이후 스텝이면 비활성화 상태
    return 'bg-gray-200 dark:bg-gray-700/30';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md 
                    border-t border-gray-100/80 dark:border-gray-700/50 shadow-lg z-40
                    transition-all duration-300">
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
        {/* 스텝 인디케이터 */}
        <div className="flex items-center">
          {/* 스텝 1: 입력 */}
          <button 
            onClick={() => handleNavigate('/')} 
            className="flex flex-col items-center relative group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            shadow-sm border
                            ${currentStep >= 1 
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-white border-primary/20' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200/60 dark:border-gray-700/50'
                            } ${currentStep === 1 && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'}`}>
              <span className="text-sm font-semibold">1</span>
            </div>
            <span className={`mt-1.5 text-xs font-medium transition-colors duration-200
                          ${currentStep >= 1 
                            ? 'text-primary dark:text-primary-foreground/90' 
                            : 'text-gray-500 dark:text-gray-400'}`}>
              입력
            </span>
            
            {/* 툴팁 - 호버시 나타남 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
              <div className="bg-gray-900/95 dark:bg-gray-950/95 text-white text-xs px-2.5 py-1.5 rounded shadow-md whitespace-nowrap">
                사용자 정보 입력
              </div>
              <div className="w-2 h-2 bg-gray-900/95 dark:bg-gray-950/95 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </button>
          
          {/* 스텝 1-2 연결선 */}
          <div className={`h-[2px] w-8 sm:w-12 md:w-16 mx-1 ${getConnectorClass(1)}`}></div>
          
          {/* 스텝 2: 추천 */}
          <button 
            onClick={() => handleNavigate('/recommendations')} 
            className="flex flex-col items-center relative group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            shadow-sm border
                            ${currentStep >= 2 
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-white border-primary/20' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200/60 dark:border-gray-700/50'
                            } ${currentStep === 2 && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'}`}>
              <span className="text-sm font-semibold">2</span>
            </div>
            <span className={`mt-1.5 text-xs font-medium transition-colors duration-200
                          ${currentStep >= 2 
                            ? 'text-primary dark:text-primary-foreground/90' 
                            : 'text-gray-500 dark:text-gray-400'}`}>
              추천
            </span>
            
            {/* 툴팁 - 호버시 나타남 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
              <div className="bg-gray-900/95 dark:bg-gray-950/95 text-white text-xs px-2.5 py-1.5 rounded shadow-md whitespace-nowrap">
                음식 추천 및 선택
              </div>
              <div className="w-2 h-2 bg-gray-900/95 dark:bg-gray-950/95 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </button>
          
          {/* 스텝 2-3 연결선 */}
          <div className={`h-[2px] w-8 sm:w-12 md:w-16 mx-1 ${getConnectorClass(2)}`}></div>
          
          {/* 스텝 3: 구성 */}
          <button 
            onClick={() => handleNavigate('/configure')} 
            className="flex flex-col items-center relative group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            shadow-sm border
                            ${currentStep >= 3 
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-white border-primary/20' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200/60 dark:border-gray-700/50'
                            } ${currentStep === 3 && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'}`}>
              <span className="text-sm font-semibold">3</span>
            </div>
            <span className={`mt-1.5 text-xs font-medium transition-colors duration-200
                          ${currentStep >= 3 
                            ? 'text-primary dark:text-primary-foreground/90' 
                            : 'text-gray-500 dark:text-gray-400'}`}>
              구성
            </span>
            
            {/* 툴팁 - 호버시 나타남 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
              <div className="bg-gray-900/95 dark:bg-gray-950/95 text-white text-xs px-2.5 py-1.5 rounded shadow-md whitespace-nowrap">
                식단 구성하기
              </div>
              <div className="w-2 h-2 bg-gray-900/95 dark:bg-gray-950/95 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </button>
          
          {/* 스텝 3-4 연결선 */}
          <div className={`h-[2px] w-8 sm:w-12 md:w-16 mx-1 ${getConnectorClass(3)}`}></div>
          
          {/* 스텝 4: 요약 */}
          <button 
            onClick={() => handleNavigate('/summary')} 
            className="flex flex-col items-center relative group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            shadow-sm border
                            ${currentStep >= 4 
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-white border-primary/20' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200/60 dark:border-gray-700/50'
                            } ${currentStep === 4 && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'}`}>
              <span className="text-sm font-semibold">4</span>
            </div>
            <span className={`mt-1.5 text-xs font-medium transition-colors duration-200
                          ${currentStep >= 4 
                            ? 'text-primary dark:text-primary-foreground/90' 
                            : 'text-gray-500 dark:text-gray-400'}`}>
              요약
            </span>
            
            {/* 툴팁 - 호버시 나타남 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
              <div className="bg-gray-900/95 dark:bg-gray-950/95 text-white text-xs px-2.5 py-1.5 rounded shadow-md whitespace-nowrap">
                식단 최종 요약
              </div>
              <div className="w-2 h-2 bg-gray-900/95 dark:bg-gray-950/95 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </button>
        </div>
        
        {/* 다음 버튼 */}
        {onNext && (
          <button 
            className="premium-button ml-4 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 
                      text-white font-medium rounded-xl shadow-md
                      hover:shadow-lg hover:shadow-primary/20
                      active:shadow-sm active:translate-y-0.5
                      transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={onNext}
          >
            {nextButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigationBar;
