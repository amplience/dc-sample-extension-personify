import React from 'react';

type Personify = any;

interface PersonifyContextProps {
  personify: Personify;
  children?: React.ReactNode;
}

const PersonifyContext = React.createContext<Personify | null>(null);

export function usePersonifyContext(): Personify {
  return React.useContext(PersonifyContext) as Personify;
}

export default function WithPersonifyContext({ personify, children }: PersonifyContextProps) {
  return <PersonifyContext.Provider value={personify}>{children}</PersonifyContext.Provider>;
}
