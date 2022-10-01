import logPlugin from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { keyBindingRegistry } from './keyBindings'

async function setupTest(options?: keyBindingRegistry.Options) {
  const [logctx] = await logPlugin.initForTest()
  return [keyBindingRegistry(logctx, options), logctx.log] as const
}

it('creates as empty registory', async () => {
  const [r] = await setupTest()
  expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', async () => {
  const [r] = await setupTest([{ command: 'some.command', key: 'ctrl+s' }])
  expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
  it('adds a new command', async () => {
    const [store] = await setupTest()
    const cmd = { command: 'a', key: 'ctrl+s' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })
  it('logs an error and ignore if a command with the name ID already exist', async () => {
    const [store, log] = await setupTest()
    const cmd1 = { command: 'a', key: 'ctrl+s' }
    const cmd2 = { command: 'a', key: 'ctrl+s' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(log.reporter, '(WARN) Registering a duplicate key binding contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  it('adds multiple commands', async () => {
    const [store] = await setupTest()
    const cmd1 = { command: 'a', key: 'ctrl+s' }
    const cmd2 = { command: 'b', key: 'ctrl+b' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})
