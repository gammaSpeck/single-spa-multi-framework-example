# single-spa-vite-react-example

This is a React TypeScript app of an example micro-frontends project with Vite and single-spa implemented together.
Instead of Webpack, this project uses Vite & TypeScript for each micro-frontends app and even the root-config.

Please refer to the [Root-config](https://github.com/rodrigo398/single-spa-vite-root-config) example for our motivation, faced issues, and implementation.

- Root-config example: https://github.com/rodrigo398/single-spa-vite-react-example

## Local development

```sh
yarn
yarn start
```

Now this app runs on 127.0.0.1:3002, but please follow the **Local development** section in [Root-config](https://github.com/rodrigo398/single-spa-vite-root-config) to run the root-config and navigate in the opened window.

## Before deployment

Set the environment variables `VITE_MF_REACT_PROD_DOMAIN` to the domains where you host this React micro-frontends app.

This example project uses `dotenv` in `vite.config.ts` to parse environment variables from `src/.env`. Please make necessary changes if you set your environment variables in different ways.
