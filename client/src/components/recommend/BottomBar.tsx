import React from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

interface BottomBarProps {
  currentStep: number;
  totalSteps: number;
  onRefresh: () => void;
  onNext: () => void;
  refreshDisabled?: boolean;
  nextDisabled?: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({
  currentStep,
  totalSteps,
  onRefresh,
  onNext,
  refreshDisabled = false,
  nextDisabled = false
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-md px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 왼쪽 버튼 */}
        <button
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onRefresh}
          disabled={refreshDisabled}
        >
          <RefreshCw size={18} className={`${refreshDisabled ? 'animate-spin' : ''}`} />
          <span>새로 추천</span>
        </button>
        
        {/* 중앙 진행 상태 */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index + 1 === currentStep
                  ? 'bg-primary'
                  : index + 1 < currentStep
                  ? 'bg-gray-400 dark:bg-gray-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        
        {/* 오른쪽 버튼 */}
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={nextDisabled}
        >
          <span>다음</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BottomBar;