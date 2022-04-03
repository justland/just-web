import { adder, push, unshift } from './adder'
import { createRegistry } from './registry'
import { createStore } from './store'

describe('adder()', () => {
  test('creates an add function for store', () => {
    const store = createStore<string[]>([])
    const add = adder(store, (array, entry) => { array.push(entry) })
    add('a', 'b')
    expect(store.get()).toEqual(['a', 'b'])
  })

  test('use provided push', () => {
    const store = createStore<string[]>([])
    const add = adder(store, push)
    add('a', 'b')
    expect(store.get()).toEqual(['a', 'b'])
  })

  test('use provided unshift', () => {
    const store = createStore<string[]>([])
    const add = adder(store, unshift)
    add('a', 'b')
    expect(store.get()).toEqual(['b', 'a'])
  })

  test('creates an add function for registry', () => {
    const store = createRegistry<string, { key: string, value: number }>({})
    const add = adder(store, (record, entry) => record[entry.key] = entry)
    add({ key: 'a', value: 1 }, { key: 'b', value: 2 })

    expect(store.get()).toEqual({
      a: { key: 'a', value: 1 },
      b: { key: 'b', value: 2 }
    })
  })
})
