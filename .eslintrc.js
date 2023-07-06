module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "react/prop-types": ["off"],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
};
