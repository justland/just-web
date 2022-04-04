import { createContext, getReadonlyContext } from '.'

describe('createContext()', () => {
  test('create context without any option', () => {
    const context = createContext()
    expect(context).toBeDefined()
    expect(context.errors.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
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

    expect(context).toBeDefined()
    expect(context.errors.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})
