import { defineConfig } from 'tsdown'

export default defineConfig([
	{
		entry: ['src/index.ts'],
		outDir: 'esm',
		format: 'esm',
		target: 'es2019'
	},
	{
		entry: ['src/index.ts'],
		outDir: 'cjs',
		format: 'cjs',
		target: 'es2019'
	}
])
