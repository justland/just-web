import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		name: 'os'
	}
})
