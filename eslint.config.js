// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/no-input-rename": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/elements-content": [
        "error",
        {
          allowList: ["lib-button"],
        },
      ],
    },
  },
  {
    files: ["**/*.ts"],
    extends: [prettierRecommended], // here we inherit from the recommended setup from eslint-plugin-prettier for TS
    rules: {},
  },
  {
    files: ["**/*.html"],
    extends: [prettierRecommended], // here we inherit from the recommended setup from eslint-plugin-prettier for HTML
    rules: {},
  }
);
