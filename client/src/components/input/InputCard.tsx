import React from 'react';

interface InputCardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
  variant?: 'default' | 'elevated' | 'bordered';
}

/**
 * 프리미엄 카드 컨테이너 컴포넌트
 * Apple/Notion 스타일의 고급스러운 디자인
 * 폼 입력 요소를 위한 세련된 UI 카드
 */
const InputCard: React.FC<InputCardProps> = ({ 
  children, 
  className = '',
  highlight = false,
  variant = 'default'
}) => {
  // 카드 스타일 변형에 따른 클래스 계산
  const variantClasses = {
    default: 'bg-white/90 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/30 shadow-sm',
    elevated: 'bg-white/95 dark:bg-gray-800/90 border border-gray-50 dark:border-gray-700/20 shadow-md',
    bordered: 'bg-white/80 dark:bg-gray-800/60 border-2 border-primary/20 dark:border-primary/30 shadow-sm'
  };
  
  // 하이라이트 효과 (백그라운드 그라디언트)
  const highlightEffect = highlight ? 'relative overflow-hidden' : '';
  
  return (
    <div 
      className={`
        premium-card p-6 rounded-xl backdrop-blur-sm 
        transition-all duration-300 hover:shadow-lg
        ${variantClasses[variant]}
        ${highlightEffect}
        ${className}
      `}
    >
      {/* 하이라이트 효과가 활성화된 경우 백그라운드 그라디언트 추가 */}
      {highlight && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      )}
      
      {/* 콘텐츠 포지셔닝 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InputCard;
