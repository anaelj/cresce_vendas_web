import { createContext, useContext, ReactNode } from 'react';

type CompanyContextType = {
  companyName: string;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

type CompanyProviderProps = {
  children: ReactNode;
};

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const companyName = 'Loja: Super João - Nova loja online';

  return (
    <CompanyContext.Provider value={{ companyName }}>
      {children}
    </CompanyContext.Provider>
  );
};