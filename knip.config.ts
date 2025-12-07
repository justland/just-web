import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	vitest: {
		entry: ['**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*']
	},
	ignore: ['**/tslib/*', '*/*/testing/*'],
	ignoreDependencies: [
		// Need patching
		'@changesets/assemble-release-plan',
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
