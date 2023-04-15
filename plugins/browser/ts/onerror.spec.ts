import { idTestGizmoFn } from '@just-web/id/testing'
import { logLevels } from '@just-web/log'
import { logTestGizmoFn } from '@just-web/log/testing'
import { incubate } from '@unional/gizmo'
import { a } from 'assertron'
import { startsWith } from 'satisfier'
import { createErrorStore } from './errorStore.js'
import { ctx } from './onerror.ctx.js'
import { registerOnErrorHandler } from './onerror.js'

it('captures error', async () => {
	const window = {} as any
	ctx.getWindow = () => window
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const errors = createErrorStore()
	let actual: Error[]
	errors.onChange(v => (actual = v))

	registerOnErrorHandler(
		{
			errors,
			preventDefault: true
		},
		{ log }
	)

	window.onerror!('some error occurred')

	expect(actual!.length).toBe(1)
	expect(actual![0].message).toBe('some error occurred')
})

it('logs captured error', async () => {
	const window = {} as any
	ctx.getWindow = () => window
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const errors = createErrorStore()

	registerOnErrorHandler(
		{
			errors,
			preventDefault: true
		},
		{ log }
	)
	window.onerror!('some error occurred')

	a.satisfies(log.reporter.logs, [
		{
			id: 'test:@just-web/browser',
			level: logLevels.error,
			args: startsWith(['onerror detected'])
		}
	])
})

it('invoke original onerror', async () => {
	expect.assertions(3)

	const window = { onerror: () => expect(1).toBe(1) } as any
	ctx.getWindow = () => window
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const errors = createErrorStore()
	let actual: Error[]
	errors.onChange(v => (actual = v))

	registerOnErrorHandler(
		{
			errors,
			preventDefault: false
		},
		{ log }
	)

	window.onerror!('some error occurred')

	expect(actual!.length).toBe(1)
	expect(actual![0].message).toBe('some error occurred')
})

it('original onerror returns true, result will be true', async () => {
	expect.assertions(3)

	const window = { onerror: () => true } as any
	ctx.getWindow = () => window
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const errors = createErrorStore()
	let actual: Error[]
	errors.onChange(v => (actual = v))

	registerOnErrorHandler(
		{
			errors,
			preventDefault: false
		},
		{ log }
	)

	const result = window.onerror!('some error occurred')

	expect(actual!.length).toBe(1)
	expect(actual![0].message).toBe('some error occurred')
	expect(result).toBe(true)
})
