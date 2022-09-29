import { createTestLogContext } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { keyBindingRegistry } from './keyBindings'

describe('add()', () => {
  test('add a new command', () => {
    const ctx = createTestLogContext()
    const store = keyBindingRegistry(ctx)
    const cmd = { command: 'a', key: 'ctrl+r' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })

  test('add existing command logs an warning and ignore', () => {
    const ctx = createTestLogContext()
    const store = keyBindingRegistry(ctx)
    const cmd1 = { command: 'a', key: 'ctrl+r' }
    const cmd2 = { command: 'a', key: 'ctrl+r' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(ctx.log.reporter, '(WARN) Registering a duplicate key binding contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  test('add multiple commands', () => {
    const ctx = createTestLogContext()
    const store = keyBindingRegistry(ctx)
    const cmd1 = { command: 'a', key: 'ctrl+r' }
    const cmd2 = { command: 'b', key: 'ctrl+r' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})
