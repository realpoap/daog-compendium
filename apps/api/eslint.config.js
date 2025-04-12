import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
	rules: {

		// TypeScript rules
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-unused-vars': ["error", { ignoreRestSiblings: true }],
		'@typescript-eslint/no-explicit-any': 'warn',

		// General JS (these might be redundant as you have js.configs.recommended)
		'no-unused-vars': 'off',
		'no-undef': 'off',
		'no-unused-expressions': 'off',

	},
});