module.exports = {
	env: {
		es6: true
	},
	extends: ['react-app', 'plugin:yml/standard'],
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier'],
			files: ['*.ts', '*.tsx']
		},
		{
			extends: ['plugin:storybook/recommended'],
			files: ['**/*.stories.*'],
			rules: {
				'import/no-anonymous-default-export': 'off'
			}
		}
	],
	root: true
}
