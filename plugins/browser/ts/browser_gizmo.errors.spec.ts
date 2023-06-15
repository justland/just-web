import { justTestApp } from '@just-web/app/testing'
import { assertType } from 'type-plus'
import { BrowserError, browserGizmoFn } from './index.js'
import { throwBrowserError } from './testing/index.js'

it('captures error', async () => {
	// adding this suppresses jest catching the error for some reason
	window.addEventListener('error', () => {})

	const app = await justTestApp()
		.with(browserGizmoFn({ preventDefault: true }))
		.create()

	const err = await throwBrowserError()

	const errors = app.browser.errors.get()
	expect(errors.length).toBe(1)
	const actual = errors[0]
	assertType<BrowserError>(actual, e => e instanceof BrowserError)
	expect(actual.cause).toBe(err)
})
