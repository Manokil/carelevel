import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 
  | 'login' 
  | 'signup' 
  | 'dashboard' 
  | 'buy' 
  | 'donate' 
  | 'profile' 
  | 'edit-profile' 
  | 'transaction-success' 
  | null;

interface ModalContextType {
  currentModal: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => {
    setCurrentModal(modalType);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
