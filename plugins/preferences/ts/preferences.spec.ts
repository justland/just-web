import { createTestApp } from '@just-web/app'
import commandsPlugin, { CommandsContext } from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard'
import { isNothing } from '@just-web/states'
import { definePlugin } from '@just-web/types'
import { AssertOrder } from 'assertron'
import { nothing, produce } from 'immer'
import { isType, JSONTypes, MaybePromise, record } from 'type-plus'
import preferencesPlugin, { clearAllUserPreferences, getUserPreference, setUserPreference } from './index.js'

const inMemoryPrefPlugin = definePlugin(() => ({
	name: 'in-memory.pref',
	init(ctx: CommandsContext) {
		let storage = record<string, any>()
		getUserPreference.connect(ctx, (key, defaultValue) => {
			return storage[key] ?? defaultValue
		})
		setUserPreference.connect(ctx, (key, value) => {
			const v = typeof value === 'function' ? produce(storage[key], value as any) : value
			return MaybePromise.transform(v, v => {
				if (isNothing(v)) delete storage[key]
				else storage[key] = v
			})
		})
		clearAllUserPreferences.connect(ctx, () => void (storage = record<string, any>()))
	}
}))

function setupTestApp() {
	return createTestApp()
		.extend(keyboardPlugin())
		.extend(commandsPlugin())
		.extend(preferencesPlugin())
		.extend(inMemoryPrefPlugin())
}

describe(`plugin.init()`, () => {
	it('provides getUserPreference() API', () => {
		const app = setupTestApp()
		const o = new AssertOrder(1)
		app.commands.handlers.register(
			getUserPreference.id,
			getUserPreference.defineHandler(key => {
				expect(key).toEqual('some-unique-id')
				o.once(1)
				return '{ a: 1 }'
			})
		)

		expect(app.preferences.get('some-unique-id')).toEqual('{ a: 1 }')

		o.end()
	})

	it('provides setUserPreference() API', () => {
		const app = setupTestApp()
		const o = new AssertOrder(1)
		app.commands.handlers.register(
			setUserPreference.id,
			setUserPreference.defineHandler((key, value) => {
				expect(key).toEqual('some-unique-id')
				expect(value).toEqual('{ a: 1 }')
				o.once(1)
			})
		)

		app.preferences.set('some-unique-id', '{ a: 1 }')

		o.end()
	})

	it('provides clearAllUserPreferences() API', () => {
		const app = setupTestApp()

		const o = new AssertOrder(1)
		app.commands.handlers.register(
			clearAllUserPreferences.id,
			clearAllUserPreferences.defineHandler(() => o.once(1))
		)

		app.preferences.clearAll()

		o.end()
	})
})

describe(`${getUserPreference.name}()`, () => {
	it('can specify a default value', () => {
		setupTestApp()
		const result = getUserPreference('new-key', 'abc')
		expect(result).toEqual(result)
	})
})

describe(`${setUserPreference.name}()`, () => {
	it('can accept undefined as value (which the implementation should remove the preference)', () => {
		setUserPreference('somekey', undefined)
	})

	it('can receive undefined from the handler (which the implementation should remove the preference)', () => {
		setUserPreference('somekey', () => undefined)
	})
})

describe(`preferences.createState()`, () => {
	function setupTestStore<T extends JSONTypes>(key: string, defaultValue?: T) {
		const { preferences } = setupTestApp()
		return preferences.createStore(key, defaultValue)
	}

	it('can specify the type of the value', () => {
		const { preferences } = setupTestApp()
		const store = preferences.createStore<{ b: string }>('some-pref')
		const result = store.get()
		isType.equal<true, { b: string }, typeof result>()
	})

	describe(`get()`, () => {
		it('returns undefined if not exist', () => {
			const store = setupTestStore('not exist')

			const result = store.get()

			isType.equal<true, JSONTypes, typeof result>()
			expect(result).toBeUndefined()
		})

		it('returns default value if defined', () => {
			const store = setupTestStore('get-default', { a: 1 })

			const result = store.get()

			isType.equal<true, { a: number }, typeof result>()
			expect(result).toEqual({ a: 1 })
		})
	})

	describe(`set()`, () => {
		type TestPref = { a: number; b?: string }
		it('can set value directly', () => {
			const store = setupTestStore<TestPref>('set-value')
			const r = store.set({ a: 2 })

			isType.equal<true, void, typeof r>()
			expect(r).toBeUndefined()

			const result = store.get()

			expect(result).toEqual({ a: 2 })
		})

		it('can set value to undefined', () => {
			const store = setupTestStore<TestPref>('set-value-to-undefined')
			const r = store.set({ a: 2 })
			isType.equal<true, void, typeof r>()
			expect(r).toBeUndefined()

			const r2 = store.set(undefined)
			expect(r2).toBeUndefined()

			const result = store.get()
			expect(result).toBeUndefined()
		})

		it('can set value to null', () => {
			const store = setupTestStore<TestPref | null>('set-to-null')
			const r = store.set(null)
			isType.equal<true, void, typeof r>()
			expect(r).toBeUndefined()

			const result = store.get()
			expect(result).toEqual(null)
		})

		it('can set value from null to something', () => {
			const store = setupTestStore('set-from-null')
			store.set(null)
			store.set(v => {
				expect(v).toBeNull()
				return 1
			})
			const result = store.get()
			expect(result).toEqual(1)
		})

		it('can set value from null to something', () => {
			const store = setupTestStore('set-with-handler->null')
			store.set(_ => null)
			const result = store.get()
			expect(result).toEqual(null)
		})

		it('accepts handler that returns new value', () => {
			const store = setupTestStore<TestPref>('set-with-handler->value')
			const r = store.set(v => ({ ...v, a: 1 }))
			isType.equal<true, void, typeof r>()
			expect(r).toBeUndefined()

			const result = store.get()
			expect(result).toEqual({ a: 1 })
		})

		it('accepts handler that update value in-place', () => {
			const store = setupTestStore<TestPref>('set-with-handler-in-place', { a: 1 })
			const r = store.set(v => {
				v!.a = 2
			})
			isType.equal<true, void, typeof r>()
			expect(r).toBeUndefined()

			const result = store.get()
			expect(result).toEqual({ a: 2 })
		})

		it('accepts handler that return nothing', () => {
			const store = setupTestStore<TestPref>('set-with-handler->nothing')
			store.set({ a: 1 })
			store.set(_ => nothing)
			const result = store.get()
			expect(result).toBeUndefined()
		})

		it('accepts async handler that returns new value', async () => {
			const store = setupTestStore<TestPref>('set-with-async-handler->value')
			const r = store.set(async v => ({ ...v, a: 1 }))
			isType.equal<true, Promise<void>, typeof r>()
			expect(await r).toBeUndefined()

			const result = store.get()
			expect(result).toEqual({ a: 1 })
		})

		it('accepts async handler that update value in-place', async () => {
			const store = setupTestStore<TestPref>('set-with-async-handler-in-place', { a: 1 })
			const r = store.set(async v => {
				v!.a = 2
			})
			isType.equal<true, Promise<void>, typeof r>()
			expect(await r).toBeUndefined()

			const result = store.get()
			expect(result).toEqual({ a: 2 })
		})

		it('accepts async handler that return nothing', async () => {
			const store = setupTestStore<TestPref>('set-with-async-handler->nothing')
			store.set({ a: 1 })
			const r = store.set(async _ => nothing)
			isType.equal<true, Promise<void>, typeof r>()
			expect(await r).toBeUndefined()

			const result = store.get()
			expect(result).toBeUndefined()
		})
	})
})
