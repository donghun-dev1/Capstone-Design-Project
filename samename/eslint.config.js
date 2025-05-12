import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript + 공통 글로벌 설정
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",   // JSX에서 React 자동 사용 (React 17+)
        NodeJS: "readonly",  // NodeJS 글로벌 타입 사용 시 오류 방지
      },
    },
    rules: {
      "no-unused-vars": "off", // TS 전용 규칙으로 대체
    },
  },

  // TypeScript 전용 규칙
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // project: "./tsconfig.json", // 제거하여 config 파일 검사 오류 방지
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },

  // React 전용 규칙
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17 이상
      "react/prop-types": "off",         // TS로 타입 체크 대체
    },
  },

  // Prettier 연동 규칙
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },

  // Prettier와 충돌하는 ESLint 기본 규칙 제거
  prettierConfig,
]);
