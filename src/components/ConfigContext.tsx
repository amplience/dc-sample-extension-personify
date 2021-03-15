import React from 'react';

export interface DcConfig {
  baseUrl?: string;
  hubName: string;
  deliveryId: string;
}

export type Config = {
  personifyXpApi: string;
  dc: DcConfig;
};

interface ConfigContextProps {
  config: Config;
  children?: React.ReactNode;
}

const ConfigContext = React.createContext<Config | null>(null);

export function useConfigContext(): Config {
  return React.useContext(ConfigContext) as Config;
}

export default function WithConfigContext({ config, children }: ConfigContextProps) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
