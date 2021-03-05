import React, { FC } from 'react';
// import { GetServerSidePropsContext } from 'next';
import personifyViewContent, { PersonifyData } from './PersonifyViewContent';
import sortByProperty from '../utils/sortByProperty';
import { withRetry } from '../utils/withRetry';

// const Cookies = require('cookies');

export type UserContext = {
  userId?: string;
  sessionId?: string;

  language: string;
  country: string;

  segment?: string;
  targetingTags: string[];
  targetingBehaviors: string[];

  dyApiPreview: string | null;

  engines: {
    personify?: PersonifyData;
  };
};

const Context = React.createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
  return React.useContext(Context) as UserContext;
}

export const WithUserContext: FC<{ value: UserContext }> = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

async function resolvePersonifyUserContext(target: UserContext) {
  // Personify
  const pxp_behaviors: string = '';
  const pxp_tags: string = '';
  const pxp_referrer: string = '';

  const personify = await personifyViewContent({
    contentname: '/',
    referrer: pxp_referrer || 'UNKNOWN',
  });

  if (!personify.missions && !personify.mission_tags) {
    throw new Error('Personify response missing data: ' + JSON.stringify(personify));
  }

  personify.missions.sort(sortByProperty('val'));
  personify.mission_tags.sort(sortByProperty('tag_score'));

  if (pxp_behaviors) {
    target.targetingBehaviors = pxp_behaviors.split(',');
  } else {
    target.targetingBehaviors = personify.missions.map((x) => x.name);
  }
  if (pxp_tags) {
    target.targetingTags = pxp_tags.split(',');
  } else {
    target.targetingTags = personify.mission_tags.map((x) => x.tag_name);
  }

  target.engines.personify = personify;
}

export async function createUserContext(): Promise<UserContext> {
  // const cookies = new Cookies(context.req);
  // const segment = cookies.get('segment');

  let result: UserContext = {
    // segment: segment || null,
    targetingTags: [],
    targetingBehaviors: [],
    engines: {
      personify: {
        mission_tags: [],
        missions: [],
        propensity: 0,
        recommendations: [],
      },
    },
    language: 'en',
    country: 'US',
    dyApiPreview: null,
  };

  try {
    await withRetry(() => resolvePersonifyUserContext(result), 'resolvePersonifyUserContext', 3);
  } catch (err) {}

  return result;
}
