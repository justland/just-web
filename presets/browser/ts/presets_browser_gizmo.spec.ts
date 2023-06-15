import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { testType } from 'type-plus'
import { presetsBrowserGizmoFn, type BrowserGizmo, type HistoryGizmo } from './index.js'
import { createMemoryHistory } from './testing/index.js'

it('provides history', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).with(presetsBrowserGizmoFn()).create()
	testType.canAssign<typeof app, HistoryGizmo>(true)
	expect(app.history).toBeDefined()
})

it('customize history', async () => {
	await justTestApp()
		.with(commandsGizmoFn())
		.with(
			presetsBrowserGizmoFn({
				history: { history: createMemoryHistory() }
			})
		)
		.create()
})

it('provide browser', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).with(presetsBrowserGizmoFn()).create()
	testType.canAssign<typeof app, BrowserGizmo>(true)
	expect(app.browser).toBeDefined()
})
