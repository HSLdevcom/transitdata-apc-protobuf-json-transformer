module.exports = {
  env: {
    es2023: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "eslint-comments",
    "import",
    "prettier",
  ],
  rules: {
    // Removed in @typescript-eslint v8; base ESLint rule still applies via airbnb-base
    "@typescript-eslint/lines-between-class-members": "off",
    // Renamed to only-throw-error in @typescript-eslint v8
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/only-throw-error": "error",
    // @typescript-eslint v8 removed allowNumber from strict-type-checked default;
    // restore it to match v7 behaviour and avoid noisy .toString() calls.
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
  },
};
