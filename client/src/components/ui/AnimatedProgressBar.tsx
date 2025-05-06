import React from 'react';

interface AnimatedProgressBarProps {
  value: number;
  max: number;
  type: 'calories' | 'protein' | 'carbs' | 'fat';
  label?: string;
  showText?: boolean;
}

const mascotSVGs = {
  calories: (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#FFD54F" />
      <circle cx="20" cy="24" r="4" fill="#37474F" />
      <circle cx="44" cy="24" r="4" fill="#37474F" />
      <path d="M32 42C25 42 20 38 20 38L22 34C22 34 26 36 32 36C38 36 42 34 42 34L44 38C44 38 39 42 32 42Z" fill="#37474F" />
      <circle cx="20" cy="24" r="1" fill="white" />
      <circle cx="44" cy="24" r="1" fill="white" />
    </svg>
  ),
  protein: (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#FF7043" />
      <circle cx="20" cy="24" r="4" fill="#37474F" />
      <circle cx="44" cy="24" r="4" fill="#37474F" />
      <path d="M32 46C28 46 24 44 20 42L22 38C26 40 30 42 32 42C34 42 38 40 42 38L44 42C40 44 36 46 32 46Z" fill="#37474F" />
      <circle cx="20" cy="24" r="1" fill="white" />
      <circle cx="44" cy="24" r="1" fill="white" />
      <path d="M26 30V34" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 30V34" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  carbs: (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#FFCA28" />
      <circle cx="20" cy="24" r="4" fill="#37474F" />
      <circle cx="44" cy="24" r="4" fill="#37474F" />
      <path d="M32 42C36 42 40 38 40 38C40 38 36 44 32 44C28 44 24 38 24 38C24 38 28 42 32 42Z" fill="#37474F" />
      <circle cx="20" cy="24" r="1" fill="white" />
      <circle cx="44" cy="24" r="1" fill="white" />
    </svg>
  ),
  fat: (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#81C784" />
      <circle cx="20" cy="24" r="4" fill="#37474F" />
      <circle cx="44" cy="24" r="4" fill="#37474F" />
      <path d="M20 38C20 38 26 46 32 46C38 46 44 38 44 38L42 34C42 34 38 40 32 40C26 40 22 34 22 34L20 38Z" fill="#37474F" />
      <circle cx="20" cy="24" r="1" fill="white" />
      <circle cx="44" cy="24" r="1" fill="white" />
    </svg>
  ),
};

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max,
  type,
  label,
  showText = true,
}) => {
  // 진행률 계산 (0% ~ 100%)
  const progressPercent = Math.min(100, Math.max(0, (value / max) * 100));
  
  // CSS 변수로 진행률 지정 (애니메이션용)
  const progressStyle = {
    '--progress-width': `${progressPercent}%`,
  } as React.CSSProperties;
  
  return (
    <div className="mb-4">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {value.toLocaleString()} / {max.toLocaleString()}
            {type === 'calories' && ' kcal'}
            {type === 'protein' && 'g'}
            {type === 'carbs' && 'g'}
            {type === 'fat' && 'g'}
          </span>
        </div>
      )}
      
      <div className="nutrition-progress">
        {/* 진행 바 */}
        <div 
          className={`nutrition-progress__fill nutrition-progress__fill--${type}`}
          style={progressStyle}
        />
        
        {/* 텍스트 (선택 사항) */}
        {showText && (
          <div className="nutrition-progress__text">
            {progressPercent.toFixed(0)}%
          </div>
        )}
        
        {/* 진행 바 위치에 따라 마스코트 위치 조정 */}
        {progressPercent > 10 && (
          <div 
            className="nutrition-progress__mascot"
            style={{
              left: `calc(${progressPercent}% - 16px)`,
              transition: 'left 1.5s ease-out',
            }}
          >
            {mascotSVGs[type]}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
