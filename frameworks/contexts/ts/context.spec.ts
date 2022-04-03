import { createContext } from './context'


describe('createContext()', () => {
  test('create context without any option', () => {
    const context = createContext()
    expect(context).toBeDefined()
    expect(context.errors.store.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
    expect(context.platform).toBeDefined()
  })
})
