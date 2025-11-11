import { defineConfig } from 'tsdown'

export default defineConfig([{
	entry: ['ts/index.ts', 'ts/testing/index.ts'],
	outDir: 'esm',
	format: 'esm',
	target: 'es2019',
}, {
	entry: ['ts/index.ts', 'ts/testing/index.ts'],
	outDir: 'cjs',
	format: 'cjs',
	target: 'es2019',
}])

