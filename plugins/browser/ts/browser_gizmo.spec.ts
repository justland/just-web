import { justTestApp } from '@just-web/app/testing'
import { ctx } from './browser_gizmo.ctx.js'
import { browserGizmoFn } from './index.js'

describe(`default().init()`, () => {
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
})
