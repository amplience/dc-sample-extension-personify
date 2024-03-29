import React, { useEffect, useState } from 'react';
import { PersonifyContext, ConfigContext, WithTheme, Loader, Page } from './components';
import { getConfig } from './services';
import { XrayContext } from './components/XrayContext';
import { usePersonify } from './hooks';

declare const PersonifyXP: any;

function App() {
  const config = getConfig(process.env, new URLSearchParams(window.location.search));
  const [loading, setLoading] = useState(true);
  const [delay, setDelay] = useState<number | null>(500);
  const [personify, setPersonify] = useState<any>();

  useEffect(() => {
    const personify = new PersonifyXP({
      api: config.personifyXpApi,
      debug: true,
      pages: {
        home: {
          name: 'home',
          type: 'content',
          getContentName: () => '/',
          isPage: true,
          track: true,
        },
      },
      actions: {},
    });
    personify.init();
    setPersonify(personify);
  }, []);

  usePersonify(
    () => {
      setDelay(null);
      setLoading(false);
    },
    delay,
    personify
  );

  return (
    <div className="App">
      <ConfigContext config={config}>
        <PersonifyContext personify={personify}>
          <XrayContext>
            <WithTheme>{loading ? <Loader /> : <Page />}</WithTheme>
          </XrayContext>
        </PersonifyContext>
      </ConfigContext>
    </div>
  );
}

export default App;
