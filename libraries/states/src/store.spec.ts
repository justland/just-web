import { nothing } from 'immer'
import { testType } from 'type-plus'
import { describe, expect, it, test } from 'vitest'
import { createStore, type ReadonlyStore, type Store, toReadonlyStore } from './store.js'

describe('createStore()', () => {
	test('get() returns initial value', () => {
		const value = { a: 1 }
		const store = createStore(value)
		const a = store.get()
		expect(a).toStrictEqual(value)
	})
	test('get() value from set()', () => {
		const store = createStore({ a: 1 })
		const value = { a: 2 }
		store.set(value)
		const a = store.get()
		expect(a).toStrictEqual(value)
	})

	test('set() triggers onChange()', () => {
		const store = createStore({ a: 1 })

		let actual: unknown
		store.onChange(v => (actual = v))

		const value = { a: 2 }
		store.set(value)
		expect(actual).toStrictEqual(value)
	})

	test('set() by modify', () => {
		const store = createStore({ a: 1 })
		store.set(s => {
			s.a = 2
		})
		const a = store.get()
		expect(a).toEqual({ a: 2 })
	})

	test('set() by return nothing', () => {
		const store = createStore({ a: 1 })
		store.set(() => nothing)
		const a = store.get()
		expect(a).toEqual(undefined)
	})

	test('set() by return', () => {
		const store = createStore({ a: 1 })
		store.set(() => ({ a: 2 }))
		const a = store.get()
		expect(a).toEqual({ a: 2 })
	})

	test('NaN -> NaN does not trigger onChange()', () => {
		const store = createStore(Number.NaN)
		store.onChange(() => {
			throw 'should not reach'
		})
		store.set(Number.NaN)
	})

	test('NaN -> number works as expected', () => {
		const store = createStore(Number.NaN)
		store.set(123)
		expect(store.get()).toBe(123)
	})

	it('infers Draft<S> behind generic', () => {
		// It does not work if `S` is not constrainted,
		// i.e. `fn<S>` will get `d: any`.
		// This seems to be a limitation of TypeScript
		// Other solutions doesn't work.
		function fn<S extends { a: number }>(store: Store<S>) {
			store.set(_d => {
				testType.equal<typeof _d.a, number>(true)
			})
		}
		fn(createStore({ a: 1 }))
	})
})

describe('toReadonly()', () => {
	test('for scalar store', () => {
		const s = createStore(1)
		const r = toReadonlyStore(s)

		expect(Object.keys(r)).toEqual(['get', 'onChange'])
		testType.equal<typeof r, ReadonlyStore<number>>(true)
	})
	test('for record store', () => {
		// `createStore(record({ a: 1 }))` is better
		// but use object literal as an example because it is more common
		const s = createStore({ a: 1 })
		const r = toReadonlyStore(s)

		expect(Object.keys(r)).toEqual(['get', 'onChange'])
		testType.equal<typeof r, ReadonlyStore<{ a: number }>>(true)
	})
	test('for array store', () => {
		const s = createStore([1, 2])
		const r = toReadonlyStore(s)

		expect(Object.keys(r)).toEqual(['get', 'onChange'])
		testType.equal<typeof r, ReadonlyStore<number[]>>(true)
	})
})
