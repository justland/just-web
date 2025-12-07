import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	vitest: {
		entry: ['**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*']
	},
	ignore: ['**/tslib/*', '*/*/testing/*'],
	ignoreDependencies: [
		// Need patching
		'@changesets/assemble-release-plan',
		// CI testing dependencies
		'playwright',
		// Build and tooling dependencies
		'@repobuddy/*',
		'eslint*',
		'repobuddy',
		// Type-only dependencies that may be inferred
		'@just-web/repo-scripts'
	]
}

export default config
