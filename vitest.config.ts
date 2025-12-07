import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.[jt]s'],
			exclude: ['src/bin.[jt]s']
		},
		projects: ['components/*', 'frameworks/*', 'libraries/*', 'plugins/*', 'presets/*', 'tools/*']
	}
})
