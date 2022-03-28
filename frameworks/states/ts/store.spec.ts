import produce, { enableMapSet } from 'immer'
import { assertType } from 'type-plus'
import { createState } from './state'
import { createStore } from './store'

describe('createStore()', () => {
  test('get() returns initial value', () => {
    const value = new Map<string, { a: number }>()
    value.set('x', { a: 1 })
    const store = createStore(value)
    const a = store.get()
    expect(a).toStrictEqual(value)
  })
  test('set() value and get by get()', () => {
    const original = new Map<string, { a: number }>()
    const store = createStore(original)
    const value = new Map<string, { a: number }>()
    value.set('b', { a: 2 })
    store.set(value)
    const a = store.get()
    expect(a).toStrictEqual(value)
  })

  test('set() triggers onChange()', () => {
    enableMapSet()
    const original = new Map<string, { a: number }>()
    const store = createStore(original)

    const [value, setValue, onChange] = createState(original)
    let actual: Map<string, { a: number }>
    onChange(v => actual = v)
    store.activate(value, setValue, onChange)

    setValue(produce(value, v => v.set('c', { a: 3 })))
    assertType<Map<string, { a: number }>>(actual!)

    expect(actual.size).toStrictEqual(1)
    expect(actual.get('c')).toEqual({ a: 3 })
  })
})
