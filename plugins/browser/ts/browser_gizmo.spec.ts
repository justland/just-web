import { justTestApp } from '@just-web/app/testing'
import { testType } from 'type-plus'
import { ctx } from './browser_gizmo.ctx.js'
import { browserGizmoFn } from './index.js'
import { registerOnErrorHandler } from './onerror.js'

afterEach(() => {
	ctx.registerOnErrorHandler = registerOnErrorHandler
	localStorage.clear()
	sessionStorage.clear()
})

it('can omit options', async () => {
	const { browser } = await justTestApp().with(browserGizmoFn()).create()
	expect(browser.errors).toBeDefined()
})

it('sends preventDefault to registerOnErrorHandler', async () => {
	expect.assertions(1)
	ctx.registerOnErrorHandler = options => {
		expect(options.preventDefault).toBe(true)
	}

	await justTestApp()
		.with(browserGizmoFn({ preventDefault: true }))
		.create()
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
