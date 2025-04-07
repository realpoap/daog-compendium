// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react'; // Import the plugin itself
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  { // Apply the flat config 
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // You can also put React rules here
    },
    settings: {
      react: {
        version: 'detect', // Or specify your React version
      },
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ["error", { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // General JS (these might be redundant as you have js.configs.recommended)
      'no-unused-vars': 'off',
      'no-undef': 'off',

      // Prettier
      'prettier/prettier': ['warn', { singleQuote: true }],
    },
  },

];