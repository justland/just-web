import { CanAssign, isType, KeyTypes } from 'type-plus'
import { createRegistry, Registry } from '.'

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
  test('get both string and symbol keys', () => {
    const s = Symbol()
    const a = createRegistry({ [s]: 's', b: 'b' })
    expect(a.keys()).toEqual(['b', s])
  })
})

describe('list()', () => {
  test('list all values', () => {
    const s = Symbol()
    const a = createRegistry({ [s]: 's', b: 'b' })
    expect(a.list()).toEqual(['b', 's'])
  })
})
