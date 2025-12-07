import { justTestApp } from '@just-web/app/testing'
import { AssertOrder, a, some, startsWith } from 'assertron'
import { logLevels } from 'standard-log'
import { stub, testType } from 'type-plus'
import { afterEach, expect, it } from 'vitest'
import { ctx } from './browser_gizmo.ctx.js'
import { browserGizmoFn } from './index.js'
import { throwBrowserError } from './testing/index.js'

afterEach(() => {
	ctx.addEventListener = addEventListener.bind(window)
	localStorage.clear()
	sessionStorage.clear()
})

it('can omit options', async () => {
	const { browser } = await justTestApp().with(browserGizmoFn()).create()
	expect(browser.errors).toBeDefined()
})

it('calls preventDefault() when set to true', async () => {
	const o = new AssertOrder(1)
	expect.assertions(1)
	ctx.addEventListener = ((event: string, listener: (ev: ErrorEvent) => any) => {
		expect(event).toEqual('error')
		const preventDefault = () => {
			o.once(1)
		}
		listener(
			stub<ErrorEvent>({
				preventDefault,
				message: 'stub'
			})
		)
	}) as any

	await justTestApp()
		.with(browserGizmoFn({ preventDefault: true }))
		.create()

	await o.end()
})

it('logs captured error', async () => {
	const { log } = await justTestApp()
		.with(browserGizmoFn({ preventDefault: true }))
		.create()

	await throwBrowserError()

	a.satisfies(
		log.reporter.logs,
		some({
			id: 'test:@just-web/browser',
			level: logLevels.error,
			args: startsWith(['onerror detected'])
		})
	)
})

it('provides sessionStorage', async () => {
	const app = await justTestApp().with(browserGizmoFn()).create()
	app.browser.sessionStorage.setItem('foo', 'value')

	expect(sessionStorage.getItem('foo')).toEqual('value')
})

it('provides localStorage', async () => {
	const app = await justTestApp().with(browserGizmoFn()).create()
	app.browser.localStorage.setItem('foo', 'value')

	expect(localStorage.getItem('foo')).toEqual('value')
})

it('provides navigator', async () => {
	const app = await justTestApp().with(browserGizmoFn()).create()

	testType.equal<typeof app.browser.navigator, Navigator>(true)
	expect(app.browser.navigator).toBeDefined()
})

it('provides location', async () => {
	const app = await justTestApp().with(browserGizmoFn()).create()

	testType.equal<typeof app.browser.location, Location>(true)
	expect(app.browser.location).toBeDefined()
})

it('uses fetch from FetchGizmo if provided', async () => {
	const app = await justTestApp()
		.merge({ fetch: async () => new Response('{}') })
		.with(browserGizmoFn())
		.create()
	const r = await app.fetch('abc')
	expect(await r.json()).toEqual({})
})

it('uses fetch from options if provided, over from FetchGizmo', async () => {
	const app = await justTestApp()
		.merge({
			fetch: async () => {
				throw 'should not reach'
			}
		})
		.with(browserGizmoFn({ fetch: async () => new Response('{}') }))
		.create()
	const r = await app.fetch('abc')
	expect(await r.json()).toEqual({})
})
