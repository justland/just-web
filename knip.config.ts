import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	workspaces: {
		'examples/*': {
			entry: ['src/index.ts', 'src/testing/index.ts']
		},
		'frameworks/*': {
			entry: ['src/index.ts', 'src/testing/index.ts']
		},
		'plugins/*': {
			entry: ['src/index.ts', 'src/testing/index.ts']
		},
		'libraries/*': {
			entry: ['src/index.ts', 'src/testing/index.ts']
		},
		'presets/*': {
			entry: ['src/index.ts', 'src/testing/index.ts']
		},
		'tools/*': {
			entry: ['src/index.ts']
		}
	},
	vitest: {
		entry: ['**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*']
	},
	ignore: ['**/tslib/*', '**/testing/*'],
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
