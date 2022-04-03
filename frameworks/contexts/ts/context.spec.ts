import { createContext, toReadonlyContext } from '.'
import { getReadonlyContext } from './context'

describe('createContext()', () => {
  test('create context without any option', () => {
    const context = createContext()
    expect(context).toBeDefined()
    expect(context.errors.store.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})

describe('toReadonlyContext()', () => {
  test('create context without any option', () => {
    const context = toReadonlyContext(createContext())

    expect(context).toBeDefined()
    expect(context.errors.store.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
    expect(context.platform).toBeDefined()
    expect(context.states).toBeDefined()
  })
})

describe('getReadonlyContext()', () => {
  test('available after calling createContext()', () => {
    createContext()
    const a = getReadonlyContext()
    expect(a).toBeDefined()
  })
  test.todo('log an error when calling it before calling createContext')
})
