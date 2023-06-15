import { justTestApp } from '@just-web/app/testing'
import { createBrowserHistory } from 'history'
import { historyGizmoFn } from './index.js'
import { createMemoryHistory } from './testing/index.js'

it('creates browser history by default', async () => {
	const { history } = await justTestApp().with(historyGizmoFn()).create()

	expect(history).toBeInstanceOf(createBrowserHistory().constructor)
})

it('can take custom history', async () => {
	const memory = createMemoryHistory()
	const { history } = await justTestApp()
		.with(
			historyGizmoFn({
				history: memory
			})
		)
		.create()

	expect(history).toBe(memory)
})
