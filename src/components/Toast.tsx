import { useEffect } from 'react';
import { AlertIcon, CheckCircleIcon } from './icons/Icons';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-0 right-0 z-[60] flex justify-center px-4">
      <div
        className={`
          flex items-center gap-3 px-6 py-4 rounded-xl
          backdrop-blur-sm border-2 w-full max-w-2xl
          animate-slide-down
          ${
            type === 'error'
              ? 'bg-red-50/95 border-red-300 text-red-800'
              : 'bg-green-50/95 border-green-300 text-green-800'
          }
        `}
      >
        <div className="flex-shrink-0">
          {type === 'error' ? (
            <div className="text-red-600">
              <AlertIcon />
            </div>
          ) : (
            <div className="text-green-600">
              <CheckCircleIcon />
            </div>
          )}
        </div>
        <p className="flex-1 font-semibold text-sm">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
