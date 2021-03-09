import React, { createContext, useContext, useState } from 'react';

export type XrayState = {
  personalizationTags: string[];
  personalizationBehaviors: string[];

  setPersonalizationTags: (value: string[]) => void;
  setPersonalizationBehaviors: (value: string[]) => void;
};

const Context = createContext<XrayState | null>(null);

export function useXrayContext(): XrayState {
  return useContext(Context) as XrayState;
}

interface XrayContextProps {
  children?: React.ReactNode;
}

export const XrayContext = ({ children }: XrayContextProps) => {
  const [personalizationTags, setPersonalizationTags] = useState<string[]>([]);
  const [personalizationBehaviors, setPersonalizationBehaviors] = useState<string[]>([]);

  return (
    <Context.Provider
      value={{
        personalizationTags,
        setPersonalizationTags,
        personalizationBehaviors,
        setPersonalizationBehaviors,
      }}
    >
      {children}
    </Context.Provider>
  );
};
