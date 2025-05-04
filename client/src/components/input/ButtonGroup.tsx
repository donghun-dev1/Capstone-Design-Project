import React from 'react';

interface ButtonOption {
  value: number | string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  value: number | string | undefined;
  onChange: (value: any) => void;
  label: string;
}

/**
 * Button group for selecting from multiple options
 */
const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="flex flex-col">
      <label className="main-input__label">{label}</label>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`main-input__meal-btn ${
              value === option.value ? 'main-input__meal-btn--active' : ''
            }`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
