import { defineConfig } from 'tsdown'
export const esm = defineConfig({
	entry: 'src/index.ts',
	outDir: 'esm',
	format: 'esm',
	target: 'es2019'
})

export const cjs = defineConfig({
	entry: 'src/index.ts',
	outDir: 'cjs',
	format: 'cjs',
	target: 'es2019'
})

export const esmTesting = defineConfig({
	entry: 'src/testing/index.ts',
	outDir: 'esm/testing',
	format: 'esm',
	target: 'es2019'
})

export const cjsTesting = defineConfig({
	entry: 'src/testing/index.ts',
	outDir: 'cjs/testing',
	format: 'cjs',
	target: 'es2019'
})

export default [esm, cjs, esmTesting, cjsTesting]
