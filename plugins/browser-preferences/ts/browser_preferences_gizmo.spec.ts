import { logLevels } from '@just-web/app'
import { clearAllUserPreferences } from '@just-web/preferences'
import { nothing } from '@just-web/states'
import { a, hasAll, some } from 'assertron'
import { ctx } from './local_storage_store.ctx.js'
import { browserPreferencesGizmoTestApp, resetLocalStorage, stubLocalStorage } from './testing/index.js'

afterEach(resetLocalStorage)

it('register just-web.clearAllUserPreferences contribution', async () => {
	const { commands } = await browserPreferencesGizmoTestApp()

	a.satisfies(commands.contributions.keys(), hasAll(clearAllUserPreferences.id))
})

it('gets undefined if the preference does not exist', async () => {
	const { preferences } = await browserPreferencesGizmoTestApp()
	const result = preferences.get('not-exist')
	expect(result).toBeUndefined()
})

it('can specify a default value (which is not saved to the store)', async () => {
	const { preferences } = await browserPreferencesGizmoTestApp()
	stubLocalStorage({
		setItem() {
			fail('should not reach')
		}
	})
	const result = preferences.get('some-key', 'abc')
	expect(result).toEqual('abc')
})

it('uses set to save', async () => {
	const { preferences } = await browserPreferencesGizmoTestApp()
	preferences.set('key-a', 'hello-world')
	expect(preferences.get('key-a')).toEqual('hello-world')
})

it('save with key prefixed with app name, so that preferences are unique across micro front end apps', async () => {
	expect.assertions(1)

	const { preferences } = await browserPreferencesGizmoTestApp()
	stubLocalStorage({
		setItem(key) {
			expect(key).toEqual('test:my-key')
		}
	})

	preferences.set('my-key', 'hello')
})

it('encodes the value when save to the store', async () => {
	const { preferences } = await browserPreferencesGizmoTestApp()
	expect.assertions(1)
	stubLocalStorage({
		setItem: (_, value) => {
			expect(value).not.toEqual('hello')
		}
	})
	preferences.set('my-key', 'hello')
})

it('emits a trace log', async () => {
	const { preferences, log } = await browserPreferencesGizmoTestApp({ log: { logLevel: logLevels.all } })
	preferences.set('emit-trace-log', 'hello-world')

	const messages = log.reporter.getLogMessagesWithIdAndLevel()
	a.satisfies(messages, some("test (TRACE) set: 'test:emit-trace-log' undefined -> hello-world"))
})

it('accepts a handler', async () => {
	const { preferences, log } = await browserPreferencesGizmoTestApp({ log: { logLevel: logLevels.all } })
	preferences.set('accept-handler', v => {
		expect(v).toBeUndefined()
		return '1'
	})
	preferences.set('accept-handler', v => {
		expect(v).toEqual('1')
		return '2'
	})

	expect(preferences.get('accept-handler')).toEqual('2')
	preferences.set('accept-handler', () => nothing)
	expect(preferences.get('accept-handler')).toBeUndefined()

	const messages = log.reporter.getLogMessagesWithIdAndLevel()
	a.satisfies(
		messages,
		hasAll(
			"test (TRACE) set: 'test:accept-handler' undefined -> 1",
			"test (TRACE) set: 'test:accept-handler' 1 -> 2",
			"test (TRACE) set: clear 'test:accept-handler'"
		)
	)
})

it('clear not set value is ok', async () => {
	const { preferences, log } = await browserPreferencesGizmoTestApp({ log: { logLevel: logLevels.all } })
	preferences.set('unknown', undefined) // do not throw

	a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(`test (TRACE) set: clear 'test:unknown'`))
})

describe('app.preferences.clearAll()', () => {
	it('only clear preference for the current app', async () => {
		const { preferences, log } = await browserPreferencesGizmoTestApp()
		preferences.set('x', '123')
		preferences.set('y', 'abc')
		const localStorage = ctx.getLocalStorage()
		localStorage.setItem('someone-else-value', 'hello')
		preferences.clearAll()
		expect(preferences.get('x')).toBeUndefined()
		expect(preferences.get('y')).toBeUndefined()
		expect(localStorage.getItem('someone-else-value')).toEqual('hello')

		a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(`test (NOTICE) clear all: 'test'`))
	})
})
