import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "prettier/prettier": ["error", {
        "semi": false,
        "trailingComma": "all",
        "singleQuote": true,
        "printWidth": 100,
        "tabWidth": 2,
        "useTabs": false,
        "bracketSpacing": true,
        "bracketSameLine": false,
        "arrowParens": "always",
        "endOfLine": "lf"
      }],
    },
  },
];

export default eslintConfig;
