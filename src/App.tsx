import React from 'react';
import { PersonifyContext, ConfigContext, PersonalizedHeroBannerBlock, WithTheme, XrayPanel } from './components';
import { getConfig } from './services';
import { v4 as uuidv4 } from 'uuid';

declare const PersonifyXP: any;

function App() {
  const config = getConfig(process.env);
  const personify = new PersonifyXP({
    getUserID: () => uuidv4(),
    api: config.personifyXpApi,
    debug: true,
    actions: {},
  });

  personify.init();

  return (
    <div className="App">
      <ConfigContext config={config}>
        <PersonifyContext personify={personify}>
          <WithTheme>
            {config.xray && <XrayPanel></XrayPanel>}
            <PersonalizedHeroBannerBlock></PersonalizedHeroBannerBlock>
          </WithTheme>
        </PersonifyContext>
      </ConfigContext>
    </div>
  );
}

export default App;
