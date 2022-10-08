import { createStandardLogForTest, logLevels } from '@just-web/log'
import { createState } from './state'

test('returns initial value', () => {
  const [value] = createState([1, 2, 3])

  expect(value).toEqual([1, 2, 3])
})

test('init value is freezed', () => {
  const init = [1, 2, 3]
  createState(init)
  expect(() => init[3] = 4).toThrow()
})

test('value is freezed', () => {
  const [value] = createState([1, 2, 3])
  expect(() => value[3] = 4).toThrow()
})

describe('set()', () => {
  it('triggers onChange with new and prev value', () => {
    const [, set, onChange] = createState([1, 2, 3])

    let newValue: number[]
    let oldValue: number[]
    onChange((value, prev) => (newValue = value, oldValue = prev))
    set([1, 2, 4])

    expect(newValue!).toEqual([1, 2, 4])
    expect(oldValue!).toEqual([1, 2, 3])
  })

  it('will not trigger onChange if the value does not change', () => {
    const [value, set, onChange] = createState([1, 2, 3])

    onChange(() => { throw 'should not trigger' })
    set(value)
  })

  it('can use a custom logger', () => {
    const sl = createStandardLogForTest(logLevels.all)
    const [, set] = createState([1])
    set([2], { logger: sl.getLogger('test') })

    expect(sl.reporter.getLogMessagesWithIdAndLevel())
      .toEqual(['test (PLANCK) state changed: [ 1 ] [ 2 ]'])
  })
})

test('reset() to the original value', () => {
  const [, set, on, reset] = createState(1)

  let a: number
  on(v => a = v)
  set(3)
  reset()
  expect(a!).toBe(1)
})

describe('onChange()', () => {
  it('registers handler only once', () => {
    const [, set, onChange] = createState(1)
    let count = 0
    const handler = () => count++
    onChange(handler)
    onChange(handler)
    set(2)

    expect(count).toBe(1)
  })

  it('can use a custom logger', () => {
    const sl = createStandardLogForTest(logLevels.all)
    const [, , onChange] = createState([1])

    let count = 0
    const handler = () => count++
    onChange(handler, { logger: sl.getLogger('test') })

    expect(sl.reporter.getLogMessagesWithIdAndLevel())
      .toEqual(['test (TRACE) new onChange handler: () => count++'])
  })

  it('skip if the same handler is already registered', () => {
    const sl = createStandardLogForTest(logLevels.all)
    const [, , onChange] = createState([1])

    let count = 0
    const handler = () => count++
    onChange(handler, { logger: sl.getLogger('test') })
    onChange(handler, { logger: sl.getLogger('test') })

    // show that setting only occurs once
    expect(sl.reporter.getLogMessagesWithIdAndLevel())
      .toEqual(['test (TRACE) new onChange handler: () => count++'])
  })

  it('returns a dispose function', () => {
    const sl = createStandardLogForTest(logLevels.all)
    const logger = sl.getLogger('test')

    const [, , onChange] = createState([1])

    let count = 0
    const handler = () => count++
    const dispose = onChange(handler, { logger })
    dispose()

    onChange(handler, { logger })

    expect(sl.reporter.getLogMessagesWithIdAndLevel())
      .toEqual([
        'test (TRACE) new onChange handler: () => count++',
        'test (TRACE) new onChange handler: () => count++'
      ])
  })

  it(`the dup handler's dispose function does nothing`, () => {
    const sl = createStandardLogForTest(logLevels.all)
    const logger = sl.getLogger('test')

    const [, set, onChange] = createState([1])

    let count = 0
    const handler = () => count++
    onChange(handler, { logger })
    const dispose = onChange(handler, { logger })
    dispose()

    set([2])

    expect(count).toBe(1)
  })
})
