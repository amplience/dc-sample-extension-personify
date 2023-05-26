[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-sample-extension-personify

![In Action](media/screenshot.png)

This project shows an example of content decisioning for a Targeted Content item using the [Personify XP UI extension](https://github.com/amplience/dc-extension-personify) and can be configured to work with a different account.

## Key features:

- Content decisioning for a Hero Banner Block using the Targeted Content schema documented in the extension
- Tracking example for an action when clicking on the Call To Action button for a Hero Banner Block

## Settings

You can override the .env config via query string parameters e.g., http://localhost:3005/?xray=true&dc-delivery-id=ee022bdd-1b39-49d7-b744-d232262cd795&dc-hub-name=ampproduct&personify-xp-api=drp0etpyn7.execute-api.eu-west-1.amazonaws.com/amplience-dev-uk-realtime-prod

- `personify-xp-api`: The Personify XP API endpoint
- `dc-delivery-id`: The content item id that will be used in the sample
- `dc-hub-name`: The hub name where the content item lives
- `dc-base-url`: Overrides the DC delivery API endpoint used to fetch content for use with staging
- `xray`: Allows Personify XP behaviors and tags to be filtered for a preview of what will display


Alternatively, you can update the sample configuration directly via .env which also allows update of port the sample is started on:

```bash
REACT_APP_PERSONIFY_XP_API=
REACT_APP_DC_HUB_NAME=
REACT_APP_DC_DELIVERY_ID=
REACT_APP_DC_BASE_URL=
PORT=
```

## How to run locally

This project requires Node 16.x or 18.x to build. Tested with Node 16.16.0, NPM 8.11.0.

- `npm i`
- `npm start`
- Visit `https://localhost:3005` in the browser and accept the security risk.
- Follow the steps above on how to set up visualization and use `https://localhost:3005` as the URL.
- Follow the steps above on how to assign an extension to the schema.
 
## Setting up a visualization

[Visualization](https://amplience.com/docs/production/visualizations.html) for the Targeted Content content type can also be [set up using this sample](https://amplience.com/docs/integration/visualizations.html#specifying-the-visualization-for-a-content-type). An example of the visualization URL to be added would be `https://localhost:3005?xray=true&dc-base-url={{vse.domain}}&dc-delivery-id={{content.sys.id}}`.
## Previewing content decisioning with X-Ray

Adding `xray=true` to the query string will display a list of behaviors or tags that can be filtered to preview what will be displayed. When on, the X-Ray side panel can be toggled on by clicking anywhere in the page apart from the Call To Action.

![In Action](media/xray.png)


## Tracking

Clicking on a Call To Action button shows an example of tracking page content via PersonifyXP and will update scores for that session.
