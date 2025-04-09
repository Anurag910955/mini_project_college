// eslint.config.js
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // 👈 Fix for import/export parsing error
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", // auto-detect React version
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // your custom rules here
    },
  },
]);
