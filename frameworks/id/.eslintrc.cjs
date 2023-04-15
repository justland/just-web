module.exports = {
	env: {
		jest: true
	},
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier'],
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/require-await': 'off'
			}
		}
	]
}
