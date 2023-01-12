# single-spa-vite-root-config

This is the Root-config of an example micro-frontends project with Vite and single-spa implemented together.
Instead of Webpack, this project uses Vite & TypeScript for each micro-frontends app and even the root-config.

The examples of other micro-frontends app in the same project:

- React: https://github.com/rodrigo398/single-spa-vite-react-example

This project originally refers to the great work of https://github.com/joeldenning/vite-single-spa-root-config .

_PS. This Root-config uses `single-spa-layout`._

## How?

Vite on development doesn't interop with SystemJS, which is used by single-spa as the default build tool.
In order to make Vite interop with single-spa in both development and production environment, this project adopts [es-module-shims](https://github.com/guybedford/es-module-shims) and adjusts the configuration on the paths to styles and public assets of each app.

## Getting started

### Local development

1. Run the following commands in this root config project

```sh
yarn
yarn start
open http://127.0.0.1:9000
```

These commands install packages and run this project for your local development.

3. Enjoy! Navigate by the top nav bar, or access http://127.0.0.1:3000/react for the React app.

### Before deployment

Set the environment variables `VITE_MF_VUE_PROD_DOMAIN` and `VITE_MF_REACT_PROD_DOMAIN` to the domains where you host the Vue/React micro-frontends apps.

This example project uses `dotenv` in `vite.config.ts` to parse environment variables from `src/.env`. Please make necessary changes if you set your environment variables in different ways.

## Implementation details

Here we share the implementation details in this project.

### Remove Webpack

Just remove Webpack config file and any Webpack-related libraries, plugins, etc. in the root-config and each micro-frontends app.

### Vite installation and configuration

1. Please refer to `package.json` of our root-config and each micro-frontends app to check necessary dependencies.
2. Please refer to `vite.config.ts` & `tsconfig.json` of our root-config and each micro-frontends app to check the configurations.
   We configure the `base` option in `vite.config.ts` in each micro-frontends app so that each app accesses the correct path to one's own public assets in different environment:

```sh
const publicAssetsBaseUrl =
  mode === "production"
    ? parsed.VITE_MF_REACT_PROD_DOMAIN + "/"
    : "http://127.0.0.1:3002/";

...

base: publicAssetsBaseUrl
```

### index.html

In root-config, change `src/index.ejs` to `src/index.html`.
Critical changes in the index files are displayed below:

1. Add this inside the head section to adopt es-module-shims:

```sh
<script async src="https://ga.jspm.io/npm:es-module-shims@1.5.4/dist/es-module-shims.js"></script>
```

2. Add the import map inside the head section.

```sh
<% if (isLocal) { %>
  <script type="importmap-shim" defer>
    {
      "imports": {
        "@vite-single-spa/root-config": "//127.0.0.1:9000/vite-single-spa-root-config.ts",
        "@vite-single-spa/react": "//127.0.0.1:3002/vite-single-spa-react.ts"
      }
    }
  </script>
<% } else { %>
  <script type="importmap-shim" defer>
    {
      "imports": {
        "@vite-single-spa/root-config": "/vite-single-spa-root-config.js",
        "@vite-single-spa/react": "<%= VITE_MF_REACT_PROD_DOMAIN %>/vite-single-spa-react.js"
      }
    }
  </script>

  <!-- In production environment, css files of each app are not loaded correctly (the paths start with root-config's domain), so in index.html we preload them using each app's domain explicitly -->

  <link rel="preload" href="<%= VITE_MF_REACT_PROD_DOMAIN %>/assets/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="<%= VITE_MF_REACT_PROD_DOMAIN %>/assets/style.css"></noscript>
<% } %>
```

3. In `body` tag, replace:

```sh
<script>
  System.import('...');
</script>
```

with:

```sh
<script type="module-shim" src="/vite-single-spa-root-config.<%= isLocal ? 'ts' : 'js' %>"></script>
```

4. Check the console of the browser and add necessary configurations in the Content-Security-Policy tag.
