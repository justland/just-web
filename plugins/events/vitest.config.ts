import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		name: 'events',
		environment: 'jsdom'
	}
})
