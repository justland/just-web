import { justTestApp } from '@just-web/app/testing'
import { stub } from 'type-plus'
import { ctx } from './browser_gizmo.ctx.js'
import { browserTestGizmoFn } from './browser_gizmo.testing.js'
import { registerOnErrorHandler } from './onerror.js'

afterEach(() => {
	ctx.registerOnErrorHandler = registerOnErrorHandler
	localStorage.clear()
	sessionStorage.clear()
})

it('can mock session storage', async () => {
	const { browser } = await justTestApp()
		.with(
			browserTestGizmoFn({
				sessionStorage: stub({
					getItem: () => 'value'
				})
			})
		)
		.create()
	expect(browser.sessionStorage.getItem('abc')).toEqual('value')
})

it('can mock local storage', async () => {
	const { browser } = await justTestApp()
		.with(
			browserTestGizmoFn({
				localStorage: stub({
					getItem: () => 'value'
				})
			})
		)
		.create()
	expect(browser.localStorage.getItem('abc')).toEqual('value')
})
