import { nodeTestPreset } from '@repobuddy/vitest/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		name: 'app'
	}
})
