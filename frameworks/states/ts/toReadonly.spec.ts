import { isType } from 'type-plus'
import { createRegistry, ReadonlyRegistry } from './registry'
import { createStore, ReadonlyStore } from './store'
import { toReadonly } from './toReadonly'

describe('toReadonly()', () => {
  test('for store', () => {
    const s = createStore({ a: 1 })
    const r = toReadonly(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange'])
    isType.equal<true, ReadonlyStore<{ a: number }>, typeof r>()
  })
  test('for registry', () => {
    const s = createRegistry({ a: 1 })
    const r = toReadonly(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange'])
    isType.equal<true, ReadonlyRegistry<number, string | symbol>, typeof r>()
  })
})
