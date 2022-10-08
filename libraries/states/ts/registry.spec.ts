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

  describe('has()', () => {
    it('returns false if not available', () => {
      const r = createRegistry<string, { id: string, value: number }>()
      expect(r.has('key')).toEqual(false)
    })

    it('returns true if exist', () => {
      const r = createRegistry<string, { id: string, value: number }>({
        key: { id: 'key', value: 1 }
      })
      expect(r.has('key')).toEqual(true)
    })

    it('return true for coerce key', () => {
      // this is a debatable point that maybe coerce should not be allowed.
      // For that, the underlying mechanism needs to change to `Map()`.
      // but for 99.99% of the case, I don't think that is necessary.

      const s1 = Symbol.for('1')
      const r = createRegistry<string | number | symbol, { id: string, value: number }>({
        0: { id: 'abc', value: 1 },
        [s1]: { id: 'x', value: 2 }
      })

      r.update(r => { r['0'] = { id: 'new', value: 3 } })

      expect(r.get()['0']).toEqual({ id: 'new', value: 3 })
      expect(r.get()[0]).toEqual({ id: 'new', value: 3 })

      expect(r.has('0')).toEqual(true)
      expect(r.has(0)).toEqual(true)

      expect(r.has(s1)).toEqual(true)
      expect(r.has(Symbol.for('1'))).toEqual(true)

      // these are not really coerce, testing for reference
      expect(r.has('1')).toEqual(false)
      expect(r.has(1)).toEqual(false)
    })
  })
})


describe('toReadonlyRegistry()', () => {
  test('usage', () => {
    const s = createRegistry()
    const r = toReadonlyRegistry(s)

    expect(Object.keys(r)).toEqual(['get', 'onChange', 'keys', 'has', 'size', 'list'])
    isType.equal<true, ReadonlyRegistry<string | number | symbol, unknown>, typeof r>()
  })
})
