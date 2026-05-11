import { createContext, useContext, useState, ReactNode } from 'react';

interface PrivacyContextType {
  isPrivate: boolean;
  togglePrivacy: () => void;
  formatAmount: (amount: number | string) => string;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [isPrivate, setIsPrivate] = useState(false);

  const togglePrivacy = () => setIsPrivate(prev => !prev);

  const formatAmount = (amount: number | string) => {
    if (isPrivate) return '*** *** ***';
    if (typeof amount === 'number') {
      return new Intl.NumberFormat('fr-FR').format(amount);
    }
    return amount.toString();
  };

  return (
    <PrivacyContext.Provider value={{ isPrivate, togglePrivacy, formatAmount }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}
