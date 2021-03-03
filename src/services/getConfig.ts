import { Config } from '../components/ConfigContext';

export default function getConfig(env: Record<string, any>, overrides: Record<string, any> = {}): Config {
  return {
    personifyXpApi: overrides.personifyXpApi ?? env.REACT_APP_PERSONIFY_XP_API,
    dc: {
      hubName: overrides.dcHubName ?? env.REACT_APP_DC_HUB_NAME,
      deliveryId: overrides.dcDeliveryId ?? env.REACT_APP_DC_CONTENT_DELIVERY_ID,
      baseUrl: overrides.dcBaseUrl ?? env.REACT_APP_DC_BASEURL,
    },
  };
}
