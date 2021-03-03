[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-sample-extension-personify

![In Action](media/screenshot.png)

This project shows an example of content decisioning for content using the [Personify XP UI extension](https://github.com/amplience/dc-extension-personify) and can be configured to work with a different account.

## Key features:

- Content decisioning for a Hero Banner Block
- Tracking example for an action

## Configuration

To update the sample to use a different account .env will need to be updated:

```bash
REACT_APP_PERSONIFY_XP_API=
REACT_APP_DC_HUB_NAME=
REACT_APP_DC_CONTENT_DELIVERY_ID=
```

## How to run locally

```bash
npm ci
npm run start
```
