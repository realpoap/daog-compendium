import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';

import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		"ignorePatterns": [
			"node_modules/",
			"**/node_modules/",
			"/**/node_modules/*",
			"out/",
			"dist/",
			"build/"
		]
	},
	{
		languageOptions: {
			globals: globals.browser,
			parser: '@typescript-eslint/parser',
			parserOptions: {
				sourceType: 'module',
			},
		},
	},
	pluginJs.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'off',
			'no-undef': 'off',
		},
	},
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
		},
	},
	pluginReact.configs.flat.recommended,
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
		},
	},
	// prettier
	prettier,
	{
		rules: {
			'prettier/prettier': ['warn', { singleQuote: true }],
		},
	},
];
