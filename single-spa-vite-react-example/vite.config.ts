import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dynamicImport from "vite-plugin-dynamic-import";

const path = require("path");
const { parsed } = require("dotenv").config({
  path: path.resolve(__dirname, "./src/.env")
});

export default defineConfig(({ mode }) => {
  const publicAssetsBaseUrl =
    mode === "production"
      ? parsed.VITE_MF_REACT_PROD_DOMAIN + "/"
      : "http://127.0.0.1:3002/";

  console.log({ publicAssetsBaseUrl });

  return {
    root: "./src",
    base: publicAssetsBaseUrl,
    rollupOptions: {
      input: "vite-single-spa-react.ts",
      format: "system",
      preserveEntrySignatures: true
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      rollupOptions: {
        input: "./src/vite-single-spa-react.ts",
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]"
        }
      }
    },
    plugins: [reactRefresh(), dynamicImport()],
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"]
  };
});
