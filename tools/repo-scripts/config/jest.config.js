module.exports = {
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			isolatedModules: true
		}
	},
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
	watchPlugins: [
		'jest-watch-suspend',
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
		['jest-watch-toggle-config-2', { setting: 'verbose' }],
		['jest-watch-toggle-config-2', { setting: 'collectCoverage' }]
	]
}
