import { Config } from '../components/ConfigContext';

export default function getConfig(env: Record<string, any>, overrides: URLSearchParams): Config {
  const personifyXpApi = overrides.get('personify-xp-api') ?? env.REACT_APP_PERSONIFY_XP_API;
  const hubName = overrides.get('dc-hub-name') ?? env.REACT_APP_DC_HUB_NAME;
  const deliveryId = overrides.get('dc-delivery-id') ?? env.REACT_APP_DC_CONTENT_DELIVERY_ID;
  const baseUrl = overrides.get('dc-base-url') ?? env.REACT_APP_DC_BASEURL;
  const xray = overrides.get('xray') ?? env.REACT_APP_XRAY;
  return {
    personifyXpApi: personifyXpApi && `https://${personifyXpApi}`,
    dc: {
      hubName,
      deliveryId,
      baseUrl: baseUrl && `https://${baseUrl}`,
    },
    xray,
  };
}
