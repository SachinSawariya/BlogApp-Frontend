"use client";

import { FiAlertTriangle, FiCheckCircle, FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ModalProps) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: <FiAlertTriangle className="text-red-600 dark:text-red-400" size={32} />,
      bg: 'bg-red-50 dark:bg-red-950/50',
      button: 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
    },
    success: {
      icon: <FiCheckCircle className="text-green-600 dark:text-green-400" size={32} />,
      bg: 'bg-green-50 dark:bg-green-950/50',
      button: 'bg-green-600 hover:bg-green-700 shadow-green-500/20'
    },
    info: {
      icon: <FiCheckCircle className="text-blue-600 dark:text-blue-400" size={32} />,
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
    }
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-gray-900 rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 fade-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 ${style.bg} rounded-3xl flex items-center justify-center mb-6`}>
            {style.icon}
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-gray-100 dark:border-gray-800"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 ${style.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
