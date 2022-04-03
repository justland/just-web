import { isType } from 'type-plus'
import { createStore, ReadonlyStore, toReadonlyStore } from './store'

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
    store.onChange(v => actual = v)

    store.set({ a: 2 })
    expect(actual).toEqual({ a: 2 })
  })

  test('NaN -> NaN does not trigger onChange()', () => {
    const store = createStore(NaN)
    store.onChange(() => { throw 'should not reach' })
    store.set(NaN)
  })
})

describe('toReadonly()', () => {
  test('for scalar store', () => {
    const s = createStore(1)
    const r = toReadonlyStore(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange'])
    isType.equal<true, ReadonlyStore<number>, typeof r>()
  })
  test('for record store', () => {
    const s = createStore({ a: 1 })
    const r = toReadonlyStore(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange'])
    isType.equal<true, ReadonlyStore<{ a: number }>, typeof r>()
  })
})
