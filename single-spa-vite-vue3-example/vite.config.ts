import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dynamicImport from "vite-plugin-dynamic-import";

import * as path from "path";
import * as dotenv from "dotenv";

const { parsed } = dotenv.config({
  path: path.resolve(__dirname, "./src/.env")
});

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const publicAssetsBaseUrl =
    config.mode === "production"
      ? parsed.VITE_MF_VUE_PROD_DOMAIN + "/"
      : "http://127.0.0.1:3003/";

  return {
    root: "./src",
    base: publicAssetsBaseUrl,
    rollupOptions: {
      input: "vite-single-spa-vue.ts",
      format: "system",
      preserveEntrySignatures: true
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      rollupOptions: {
        input: "./src/vite-single-spa-vue.ts",
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]"
        }
      }
    },
    plugins: [vue(), dynamicImport()],
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"]
  };
});
