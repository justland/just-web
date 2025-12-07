import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		name: 'repo-scripts',
		environment: 'node',
		include: ['src/**/*.{spec,test,integrate,accept,system,unit}.[jt]s?(x)']
	}
})
