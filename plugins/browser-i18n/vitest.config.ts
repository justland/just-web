import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		name: 'browser-i18n',
		environment: 'jsdom'
	}
})
