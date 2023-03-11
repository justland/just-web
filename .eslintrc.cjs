module.exports = {
	env: {
		node: true,
		es6: true
	},
	extends: ['plugin:harmony/latest', 'plugin:yml/standard'],
	rules: {
		'yml/quotes': ['error', { prefer: 'single' }]
	},
	root: true
}
