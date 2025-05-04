import React from 'react';

interface TermsAgreementProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Terms and conditions agreement checkbox
 */
const TermsAgreement: React.FC<TermsAgreementProps> = ({ checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="terms" className="font-medium text-gray-700">이용약관 및 개인정보 수집 동의</label>
        <p className="text-gray-500">
          서비스 이용약관 및 개인정보 수집·이용에 동의합니다.{' '}
          <a href="#" className="text-primary hover:text-primary/90">약관 보기</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAgreement;
