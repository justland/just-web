import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	ignore: ['**/tslib/*', '*/*/testing/*'],
	ignoreDependencies: [
		// Build and tooling dependencies
		'@repobuddy/*',
		'@size-limit/*',
		'eslint*',
		'repobuddy',
		'rimraf',
		'size-limit',
		'tslib',
		// Type-only dependencies that may be inferred
		'@just-web/fetch',
		'@just-web/states',
		'@just-web/repo-scripts'
	]
}

export default config
