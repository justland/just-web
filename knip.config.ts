import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	ignore: ['.jest/*', '**/tslib/*', '*/*/testing/*'],
	ignoreDependencies: [
		// Build and tooling dependencies
		'@repobuddy/*',
		'@size-limit/*',
		'@types/jest',
		'eslint*',
		'jest-*',
		'repobuddy',
		'rimraf',
		'size-limit',
		'ts-jest',
		'tslib',
		// Type-only dependencies that may be inferred
		'@just-web/fetch',
		'@just-web/states',
		'@just-web/repo-scripts'
	]
}

export default config
