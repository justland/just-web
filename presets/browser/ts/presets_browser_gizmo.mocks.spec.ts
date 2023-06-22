import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { presetsBrowserTestGizmoFn } from './testing/index.js'

it('can stub fetch', async () => {
	const app = await justTestApp()
		.with(commandsGizmoFn())
		.with(
			presetsBrowserTestGizmoFn({
				browser: {
					fetch: async () => new Response('{ "value": "abc" }')
				}
			})
		)
		.create()

	const r = await app.fetch('abc')
	expect(await r.json()).toEqual({ value: 'abc' })
})
