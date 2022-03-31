import { createState } from './state'

test('returns initial value', () => {
  const [value] = createState([1, 2, 3])

  expect(value).toEqual([1, 2, 3])
})

test('setValue triggers onChange with new and prev value', () => {
  const [, setValue, onChange] = createState([1, 2, 3])

  let newValue: number[]
  let oldValue: number[]
  onChange((value, prev) => (newValue = value, oldValue = prev))
  setValue([1, 2, 4])

  expect(newValue!).toEqual([1, 2, 4])
  expect(oldValue!).toEqual([1, 2, 3])
})

test('setValue will not trigger onChange if the value does not change', () => {
  const [value, setValue, onChange] = createState([1, 2, 3])

  onChange(() => { throw 'should not trigger' })
  setValue(value)
})

test('reset() to the original value', () => {
  const [,set,on,reset] = createState(1)

  let a: number
  on(v => a = v)
  set(3)
  reset()
  expect(a!).toBe(1)
})
