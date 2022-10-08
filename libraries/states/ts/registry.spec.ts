import { CanAssign, isType, KeyTypes } from 'type-plus'
import { createRegistry, Registry, withAdder } from '.'
import { ReadonlyRegistry, toReadonlyRegistry } from './registry'

describe('createRegistry()', () => {
  test('create empty registry', () => {
    const a = createRegistry()
    expect(a.size()).toBe(0)
    isType.equal<true, Registry<KeyTypes, unknown>, typeof a>()
  })

  test('create with initial records', () => {
    const a = createRegistry({ a: 1, b: 2 })
    expect(a.size()).toBe(2)
    isType.equal<true, Registry<string, number>, typeof a>()
  })

  test('key of the init record can be symbol', () => {
    const s = Symbol()
    const a = createRegistry({ [s]: 's', b: 'b' })
    expect(a.size()).toBe(2)
    expect(a.get()[s]).toBe('s')
    isType.equal<true, true, CanAssign<typeof a, Registry<string | symbol, string>>>()
  })

  describe('keys()', () => {
    it('gets both string and symbol keys', () => {
      const s = Symbol()
      const a = createRegistry({ [s]: 's', b: 'b' })
      expect(a.keys()).toEqual(['b', s])
    })

    it('gets key through add()', () => {
      const r = withAdder(
        createRegistry<string, { id: string, value: number }>(),
        (r, e) => r[e.id] = e
      )
      r.add({ id: 'a', value: 1 }, { id: 'b', value: 1 })

      expect(r.keys()).toEqual(['a', 'b'])
    })
  })

  describe('list()', () => {
    test('list all values', () => {
      const s = Symbol()
      const a = createRegistry({ [s]: 's', b: 'b' })
      expect(a.list()).toEqual(['b', 's'])
    })
  })
})


describe('toReadonlyRegistry()', () => {
  test('usage', () => {
    const s = createRegistry({ a: 1 })
    const r = toReadonlyRegistry(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange', 'keys', 'size', 'list'])
    isType.equal<true, ReadonlyRegistry<string, number>, typeof r>()
  })
})
