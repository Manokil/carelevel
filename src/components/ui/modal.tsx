import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  className = "" 
}) => {

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={handleOverlayClick}
      />
      
      {/* Modal content */}
      <div className={`relative bg-white dark:bg-[#171B20] rounded-lg shadow-lg w-[335px] ${title === 'Login' ? 'h-[563px]' : title === 'Sign Up' ? 'h-[667px]' : title === 'Edit Profile' ? 'h-[800px]' : 'h-[351px]'} min-[450px]:w-[400px] ${title === 'Login' ? 'min-[450px]:h-[563px]' : title === 'Sign Up' ? 'min-[450px]:h-[667px]' : title === 'Edit Profile' ? 'min-[450px]:w-[600px] sm:min-[600px]:h-[660px]' : 'min-[450px]:h-[351px]'} mx-4 overflow-y-auto ${className}`}>
        {/* Header - Hide for Transaction Success */}
        {title !== 'Transaction Success' && (
          <div className="flex items-center justify-end px-4 py-2 border-b border-light-modeborder dark:border-white/20 dark:border-white/20">
            {title && (
              <h2 className="text-[16px] text-light-modegrey dark:text-light-modegrey flex-1">
                {title}
              </h2>
            )}
            <button
              onClick={(e) => {
                console.log('X button clicked');
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-light-modeborder dark:hover:bg-light-modedark-grey rounded-md transition-colors border border-light-modeborder dark:border-white/20 dark:border-white/20 bg-[#F9F9F9] dark:bg-[#0D1117]"
            >
              <X className="w-5 h-5 text-light-modegrey dark:text-light-modegrey" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
