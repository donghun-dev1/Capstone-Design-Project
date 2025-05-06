import React from 'react';

interface InputCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 세련된 카드 컨테이너 컴포넌트
 * 폼 입력 요소를 위한 고급스러운 디자인의 카드
 */
const InputCard: React.FC<InputCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`main-input__card bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/30 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default InputCard;
