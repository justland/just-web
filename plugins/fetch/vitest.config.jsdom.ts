import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		name: 'fetch:jsdom',
		environment: 'jsdom'
	}
})
