import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		include: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)']
	}
})
