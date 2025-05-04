import React from 'react';

interface ErrorModalProps {
  isVisible: boolean;
  message: string;
  onRetry: () => void;
  onClose: () => void;
}

/**
 * Error modal component
 */
const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, message, onRetry, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center max-w-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">오류가 발생했습니다</h3>
        <p className="text-gray-600 text-center mb-4">{message}</p>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={onRetry}
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
