import React, { useEffect } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  mt?: string;
}

const GlobalModal: React.FC<ModalProps> = ({ isOpen, onClose, children, mt }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal when clicking on the background
  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-auto bg-slate-900 bg-opacity-50 py-10 mx-3 sm:mx-0 
        transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white dark:text-gray-400 dark:bg-[#30303d] z-999 relative rounded-lg shadow-lg transform transition-transform duration-300 ${mt}
        ${isOpen ? 'scale-100' : 'scale-95'}`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button onClick={onClose} className='float-right pt-3 pr-3'>
          <IoMdCloseCircleOutline size={30} className='dark:text-white text-black' />
        </button>
        <div className='p-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;