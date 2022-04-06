import { create, getReadonlyContext } from '.'

describe('createContext()', () => {
  test('create context without any option', () => {
    const context = create()
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
    create()
    const a = getReadonlyContext()
    expect(a).toBeDefined()
  })
  test.todo('log an error when calling it before calling createContext')
  test('create context without any option', () => {
    create()
    const context = getReadonlyContext()

    expect(context.errors).toBeDefined()
    expect(context.commands).toBeDefined()
    expect(context.contributions).toBeDefined()
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})
