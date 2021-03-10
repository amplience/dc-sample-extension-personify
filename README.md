[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-sample-extension-personify

![In Action](media/screenshot.png)

This project shows an example of content decisioning for content using the [Personify XP UI extension](https://github.com/amplience/dc-extension-personify) and can be configured to work with a different account.

## Key features:

- Content decisioning for a Hero Banner Block
- Tracking example for an action when clicking on the Call To Action button for a Hero Banner Block

## Configuration

You can override the .env config via query string parameters e.g., http://localhost:3005/?xray=true&dc-delivery-id=ee022bdd-1b39-49d7-b744-d232262cd795&dc-hub-name=ampproduct&personify-xp-api=drp0etpyn7.execute-api.eu-west-1.amazonaws.com/amplience-dev-uk-realtime-prod

- `personify-xp-api`: The Personify XP api endpoint
- `dc-delivery-id`: The content item id that will be used in the sample
- `dc-hub-name`: The hub name where the content item lives
- `dc-base-url`: Overrides the DC delivery api endpoint used to fetch content for use with staging
- `xray` : Allows Personify XP behaviours and tags to be filtered for a preview of what will display

Alternatively, you can update the sample configurartion directly via .env:

```bash
REACT_APP_PERSONIFY_XP_API=
REACT_APP_DC_HUB_NAME=
REACT_APP_DC_DELIVERY_ID=
REACT_APP_DC_BASE_URL=
```

## How to run locally

```bash
npm ci
npm run start
```
