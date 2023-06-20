import { justTestApp } from '@just-web/app/testing'
import { fetchTestGizmoFn } from './testing/index.js'

it('can stub the fetch function', async () => {
	const app = await justTestApp()
		.with(
			fetchTestGizmoFn({
				fetch: async () => new Response('{ "value": "abc" }')
			})
		)
		.create()

	const r = await app.fetch('dummy')
	expect(await r.json()).toEqual({ value: 'abc' })
})
