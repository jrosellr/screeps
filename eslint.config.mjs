import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["src/**/*.ts", "scripts/**/*.ts"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
    },
  },
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  tseslint.configs.strict,
  eslintConfigPrettier,
]);
