import { browserTestPreset } from '@repobuddy/vitest/config/browser'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [browserTestPreset({ includeGeneralTests: true })],
	test: {
		name: 'browser-preferences'
	}
})
