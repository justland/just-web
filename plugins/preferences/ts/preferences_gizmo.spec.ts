import { nothing } from '@just-web/states'
import { testType, type JSONTypes } from 'type-plus'
import { clearAllUserPreferences, getUserPreference } from './index.js'
import { setupMemoryPreferencesTestApp } from './testing/index.js'

it('can get/set user preferences', async () => {
	const app = await setupMemoryPreferencesTestApp()
	expect(app.preferences.get('some-unique-id')).toBeUndefined()

	app.preferences.set('some-unique-id', '{ a: 1 }')
	expect(app.preferences.get('some-unique-id')).toEqual('{ a: 1 }')
})

it('can specify a default value during get', async () => {
	const app = await setupMemoryPreferencesTestApp()
	expect(app.preferences.get('new-key', 'abc')).toEqual('abc')
	expect(app.preferences.get('new-key')).toBeUndefined()
})

it('can accept undefined as value during set (which the implementation should remove the preference)', async () => {
	const app = await setupMemoryPreferencesTestApp()
	app.preferences.set('somekey', undefined)
})

it('can receive undefined from the handler (which the implementation should remove the preference)', async () => {
	const app = await setupMemoryPreferencesTestApp()
	app.preferences.set('somekey', () => undefined)
})

it('can clear all user preferences', async () => {
	const app = await setupMemoryPreferencesTestApp()

	app.preferences.set('some-unique-id', '{ a: 1 }')
	app.preferences.clearAll()
	expect(app.preferences.get('some-unique-id')).toBeUndefined()
})

it('can use getUserPreference() to provide implicit default value', async () => {
	const app = await setupMemoryPreferencesTestApp()
	getUserPreference.connect(app, key => (key === 'some-unique-id' ? '{ a: 2 }' : undefined))

	expect(app.preferences.get('some-unique-id')).toEqual('{ a: 2 }')
})

it('provides clearAllUserPreferences() API', async () => {
	const app = await setupMemoryPreferencesTestApp()
	expect.assertions(1)
	clearAllUserPreferences.connect(app, () => expect('called').toEqual('called'))

	app.preferences.clearAll()
})

describe(`createStore()`, () => {
	it('can specify the type of the value through generics', async () => {
		const app = await setupMemoryPreferencesTestApp()
		const store = app.preferences.createStore<{ b: string }>('some-pref')
		const result = store.get()
		testType.equal<typeof result, { b: string }>(true)
	})

	async function setupTestStore<T extends JSONTypes>(key: string, defaultValue?: T) {
		const { preferences } = await setupMemoryPreferencesTestApp()
		return preferences.createStore(key, defaultValue)
	}

	it('returns undefined if not exist', async () => {
		const store = await setupTestStore('not exist')

		const result = store.get()

		testType.equal<typeof result, JSONTypes>(true)
		expect(result).toBeUndefined()
	})

	it('returns default value if defined', async () => {
		const store = await setupTestStore('get-default', { a: 1 })

		const result = store.get()

		testType.equal<typeof result, { a: number }>(true)
		expect(result).toEqual({ a: 1 })
	})

	type TestPref = { a: number; b?: string }
	it('can set value directly', async () => {
		const store = await setupTestStore<TestPref>('set-value')
		const r = store.set({ a: 2 })

		testType.equal<typeof r, void>(true)
		expect(r).toBeUndefined()

		const result = store.get()

		expect(result).toEqual({ a: 2 })
	})

	it('can set value to undefined', async () => {
		const store = await setupTestStore<TestPref>('set-value-to-undefined')
		const r = store.set({ a: 2 })

		testType.equal<typeof r, void>(true)
		expect(r).toBeUndefined()

		const r2 = store.set(undefined)
		expect(r2).toBeUndefined()

		const result = store.get()
		expect(result).toBeUndefined()
	})

	it('can set value to null', async () => {
		const store = await setupTestStore<TestPref | null>('set-to-null')
		const r = store.set(null)

		testType.equal<typeof r, void>(true)
		expect(r).toBeUndefined()

		const result = store.get()
		expect(result).toEqual(null)
	})

	it('can set value from null to something', async () => {
		const store = await setupTestStore('set-from-null')
		store.set(null)
		store.set(v => {
			expect(v).toBeNull()
			return 1
		})
		const result = store.get()
		expect(result).toEqual(1)
	})

	it('can set value from null to something', async () => {
		const store = await setupTestStore('set-with-handler->null')
		store.set(_ => null)
		const result = store.get()
		expect(result).toEqual(null)
	})

	it('accepts handler that returns new value', async () => {
		const store = await setupTestStore<TestPref>('set-with-handler->value')
		const r = store.set(v => ({ ...v, a: 1 }))
		testType.equal<typeof r, void>(true)

		expect(r).toBeUndefined()

		const result = store.get()
		expect(result).toEqual({ a: 1 })
	})

	it('accepts handler that update value in-place', async () => {
		const store = await setupTestStore<TestPref>('set-with-handler-in-place', { a: 1 })
		const r = store.set(v => {
			v!.a = 2
		})
		testType.equal<typeof r, void>(true)

		expect(r).toBeUndefined()

		const result = store.get()
		expect(result).toEqual({ a: 2 })
	})

	it('accepts handler that return nothing', async () => {
		const store = await setupTestStore<TestPref>('set-with-handler->nothing')
		store.set({ a: 1 })
		store.set(_ => nothing)
		const result = store.get()
		expect(result).toBeUndefined()
	})

	it('accepts async handler that returns new value', async () => {
		const store = await setupTestStore<TestPref>('set-with-async-handler->value')
		const r = store.set(async v => ({ ...v, a: 1 }))
		testType.equal<typeof r, Promise<void>>(true)
		expect(await r).toBeUndefined()

		const result = store.get()
		expect(result).toEqual({ a: 1 })
	})

	it('accepts async handler that update value in-place', async () => {
		const store = await setupTestStore<TestPref>('set-with-async-handler-in-place', { a: 1 })
		const r = store.set(async v => {
			v!.a = 2
		})
		testType.equal<typeof r, Promise<void>>(true)
		expect(await r).toBeUndefined()

		const result = store.get()
		expect(result).toEqual({ a: 2 })
	})

	it('accepts async handler that return nothing', async () => {
		const store = await setupTestStore<TestPref>('set-with-async-handler->nothing')
		store.set({ a: 1 })
		const r = store.set(async _ => nothing)
		testType.equal<typeof r, Promise<void>>(true)
		expect(await r).toBeUndefined()

		const result = store.get()
		expect(result).toBeUndefined()
	})
})
