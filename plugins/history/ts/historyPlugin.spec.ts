import { createTestApp } from '@just-web/app'
import { createBrowserHistory, createMemoryHistory } from 'history'
import historyPlugin, { HistoryOptions } from './index.js'

describe('historyPlugin', () => {
	it('creates browser history by default', () => {
		const { history } = setupTestApp()

		expect(history).toBeInstanceOf(createBrowserHistory().constructor)
	})

	it('can take custom history', () => {
		const customHistory = createMemoryHistory()
		const { history } = setupTestApp({ history: customHistory })

		expect(history).toBe(customHistory)
	})
})

function setupTestApp(options?: HistoryOptions) {
	return createTestApp().extend(historyPlugin(options))
}
