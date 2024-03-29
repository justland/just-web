import { testType } from 'type-plus'
import {
	adder,
	createRegistry,
	createStore,
	push,
	unshift,
	withAdder,
	type Registry,
	type Store,
	type WithAdder
} from './index.js'

describe('adder()', () => {
	describe('with array store', () => {
		it('creates an add function for the store', () => {
			const store = createStore<string[]>([])
			const add = adder(store, (array, entry) => {
				array.push(entry)
			})
			add('a', 'b')
			expect(store.get()).toEqual(['a', 'b'])
		})

		it('can use the provided push() function', () => {
			const store = createStore<string[]>([])
			const add = adder(store, push)
			add('a', 'b')
			expect(store.get()).toEqual(['a', 'b'])
		})

		it('can use the provided unshift() function', () => {
			const store = createStore<string[]>([])
			const add = adder(store, unshift)
			add('a', 'b')
			expect(store.get()).toEqual(['b', 'a'])
		})
	})

	describe('with record store', () => {
		it('creates an add function for the store', () => {
			const store = createStore<Record<string, { key: string; value: number }>>({})
			const add = adder(store, (r, entry) => {
				r[entry.key] = entry
			})
			add({ key: 'a', value: 1 }, { key: 'b', value: 2 })
			expect(store.get()).toEqual({
				a: { key: 'a', value: 1 },
				b: { key: 'b', value: 2 }
			})
		})
	})
	test('creates an add function for registry', () => {
		const registry = createRegistry<string, { key: string; value: number }>({})
		const add = adder(registry, (record, entry) => (record[entry.key] = entry))
		add({ key: 'a', value: 1 }, { key: 'b', value: 2 })

		expect(registry.get()).toEqual({
			a: { key: 'a', value: 1 },
			b: { key: 'b', value: 2 }
		})
	})
})

describe('withAdder()', () => {
	it('works with array store', () => {
		const store = withAdder(createStore<string[]>([]), (array, entry) => {
			array.push(entry)
		})
		store.add('a', 'b')
		testType.equal<Parameters<typeof store.add>, string[]>(true)
		expect(store.get()).toEqual(['a', 'b'])
	})

	it('works with record store', () => {
		type K = string
		type T = { id: string; value: number }
		const recordStore = createStore<Record<K, T>>({})
		const store = withAdder(recordStore, (store, entry) => {
			store[entry.id] = entry
		})

		testType.equal<typeof store, Store<Record<K, T>> & WithAdder<T>>(true)

		store.add({ id: 'a', value: 1 }, { id: 'b', value: 2 })
		expect(store.get()).toEqual({ a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } })
	})

	test('for record registry', () => {
		type K = string
		type T = { a: string }

		const registry = withAdder(createRegistry<K, T>(), (record, entry) => {
			record[entry.a] = entry
		})

		testType.equal<typeof registry, Registry<K, T> & WithAdder<T>>(true)

		registry.add({ a: 'x' }, { a: 'y' })
		expect(registry.get()).toEqual({ x: { a: 'x' }, y: { a: 'y' } })
	})
})
