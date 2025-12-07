import type { MemoryLogReporter } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { testType } from 'type-plus'
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

it('keep overridden log gizmo', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).with(presetsBrowserTestGizmoFn()).create()

	testType.equal<typeof app.log.reporter, MemoryLogReporter>(true)
})
