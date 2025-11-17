// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier'; 
import globals from 'globals';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'node_modules/']
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Disable the no-explicit-any rule for test files
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }]
    },
  },
  {
    "files": ["test/**/*.spec.ts"],
    "rules": {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      }
    }
  },
);