import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**/*.{spec,test,integrate,accept,system,unit}.[jt]s?(x)'],
		name: 'states',
		environment: 'node'
	}
})
