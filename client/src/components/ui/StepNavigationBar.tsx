import React from 'react';
import { useLocation } from 'wouter';

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
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-10">
      <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center transition-colors hover:text-primary focus:outline-none group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentStep === 1 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-500 group-hover:bg-primary/20'
            }`}>1</div>
            <div className={`ml-2 text-sm ${
              currentStep === 1 
                ? 'font-medium' 
                : 'text-gray-500'
            }`}>입력</div>
          </button>
          
          <button 
            onClick={() => navigate('/recommendations')} 
            className="flex items-center transition-colors hover:text-primary focus:outline-none group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentStep === 2 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-500 group-hover:bg-primary/20'
            }`}>2</div>
            <div className={`ml-2 text-sm ${
              currentStep === 2 
                ? 'font-medium' 
                : 'text-gray-500'
            }`}>추천</div>
          </button>
          
          <button 
            onClick={() => navigate('/configure')} 
            className="flex items-center transition-colors hover:text-primary focus:outline-none group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentStep === 3 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-500 group-hover:bg-primary/20'
            }`}>3</div>
            <div className={`ml-2 text-sm ${
              currentStep === 3 
                ? 'font-medium' 
                : 'text-gray-500'
            }`}>구성</div>
          </button>
          
          <button 
            onClick={() => navigate('/summary')} 
            className="flex items-center transition-colors hover:text-primary focus:outline-none group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentStep === 4 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-500 group-hover:bg-primary/20'
            }`}>4</div>
            <div className={`ml-2 text-sm ${
              currentStep === 4 
                ? 'font-medium' 
                : 'text-gray-500'
            }`}>요약</div>
          </button>
        </div>
        
        {onNext && (
          <button 
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
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
