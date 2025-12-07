import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			include: ['ts/**/*.[jt]s'],
			exclude: ['ts/bin.[jt]s']
		}
	}
})
