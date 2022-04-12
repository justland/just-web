import { createContext, getReadonlyContext } from '.'

describe('createContext()', () => {
  test('create context without any option', () => {
    const context = createContext()
    expect(context.errors).toBeDefined()
    expect(context.commands).toBeDefined()
    expect(context.contributions).toBeDefined()
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})

describe('toReadonlyContext()', () => {
})

describe('getReadonlyContext()', () => {
  test('available after calling createContext()', () => {
    createContext()
    const a = getReadonlyContext()
    expect(a).toBeDefined()
  })
  test.todo('log an error when calling it before calling createContext')
  test('create context without any option', () => {
    createContext()
    const context = getReadonlyContext()

    expect(context.errors).toBeDefined()
    expect(context.commands).toBeDefined()
    expect(context.contributions).toBeDefined()
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})
