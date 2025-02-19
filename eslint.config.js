import { Linter } from "eslint";

/** @type {Linter.Config} */
const config = {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
};

export default config;
