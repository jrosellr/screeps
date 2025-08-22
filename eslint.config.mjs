import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import markdown from "@eslint/markdown";

export default tseslint.config(
  {
    ignores: ["dist/**"],
  },
  eslint.configs.recommended,
  {
    files: ["src/**/*.ts", "scripts/**/*.ts"],
    extends: [tseslint.configs.strict, tseslint.configs.stylistic],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "no-empty": "error",
    },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  eslintConfigPrettier,
);
