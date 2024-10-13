import React, { createContext, useContext, useState, useCallback } from 'react';

interface LookupData {
  makes: Record<string, string>;
  models: Record<string, string>;
  bodyStyles: Record<string, string>;
  conditions: Record<string, string>;
  features: Record<string, string>;
}

interface LookupContextType {
  lookupData: LookupData;
  addLookupData: (key: keyof LookupData, id: string, name: string) => void;
}

const LookupContext = createContext<LookupContextType | undefined>(undefined);

export const LookupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lookupData, setLookupData] = useState<LookupData>({
    makes: {},
    models: {},
    bodyStyles: {},
    conditions: {},
    features: {},
  });

  const addLookupData = useCallback(
    (key: keyof LookupData, id: string, name: string) => {
      setLookupData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [id]: name },
      }));
    },
    []
  );

  return (
    <LookupContext.Provider value={{ lookupData, addLookupData }}>
      {children}
    </LookupContext.Provider>
  );
};

export const useLookup = () => {
  const context = useContext(LookupContext);
  if (context === undefined) {
    throw new Error('useLookup must be used within a LookupProvider');
  }
  return context;
};
