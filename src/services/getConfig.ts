import { Config } from '../components/ConfigContext';

export default function getConfig(env: Record<string, any>, overrides: URLSearchParams): Config {
  return {
    personifyXpApi: overrides.get('personify-xp-api') ?? env.REACT_APP_PERSONIFY_XP_API,
    dc: {
      hubName: overrides.get('dc-hub-name') ?? env.REACT_APP_DC_HUB_NAME,
      deliveryId: overrides.get('dc-delivery-id') ?? env.REACT_APP_DC_CONTENT_DELIVERY_ID,
      baseUrl: overrides.get('dc-base-url') ?? env.REACT_APP_DC_BASEURL,
    },
    xray: overrides.get('xray') ?? env.REACT_APP_XRAY,
  };
}
