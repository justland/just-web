import { createContext } from './context'
import { toReadonlyContext } from './readonlyContext'


describe('toReadonlyContext()', () => {
  test('create context without any option', () => {
    const context = toReadonlyContext(createContext())

    expect(context).toBeDefined()
    expect(context.errors.store.get()).toEqual([])
    expect(context.commands.registry.keys()).toEqual([])
    expect(context.contributions.commands.keys()).toEqual([])
    expect(context.contributions.keyBindings.keys()).toEqual([])
  })
})
