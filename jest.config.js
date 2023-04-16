module.exports = {
	collectCoverageFrom: ['<rootDir>/ts/**/*.[jt]s', '!<rootDir>/ts/bin.[jt]s'],
	projects: ['components/*', 'frameworks/*', 'libraries/*', 'plugins/*', 'presets/*', 'tools/*'],
	watchPlugins: [
		'jest-watch-suspend',
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
		['jest-watch-toggle-config-2', { setting: 'verbose' }],
		['jest-watch-toggle-config-2', { setting: 'collectCoverage' }]
	]
}
