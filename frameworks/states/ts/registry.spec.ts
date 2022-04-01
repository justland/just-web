import { createRegistry } from '.'

test('create empty registry', () => {
  const a = createRegistry()
  expect(a.size()).toBe(0)
})

test('create with initial records', () => {
  const a = createRegistry({ a: 1, b: 2 })
  expect(a.size()).toBe(2)
})

test('key of the init record can be symbol', () => {
  const s = Symbol()
  const a = createRegistry({ [s]: 's', b: 'b' })
  expect(a.size()).toBe(2)
  expect(a.get()[s]).toBe('s')
})
