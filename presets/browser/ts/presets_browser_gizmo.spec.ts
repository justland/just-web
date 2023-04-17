import { justTestApp } from '@just-web/app/testing'
import type { BrowserGizmo } from '@just-web/browser'
import { commandsGizmoFn } from '@just-web/commands'
import type { HistoryGizmo } from '@just-web/history'
import { createMemoryHistory } from 'history'
import { testType } from 'type-plus'
import { presetsBrowserGizmoFn } from './index.js'

it('provides history', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).with(presetsBrowserGizmoFn()).create()
	testType.canAssign<typeof app, HistoryGizmo>(true)
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
})
