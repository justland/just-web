import logPlugin from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { commandContributionRegistry } from './commands'

async function setupTest(options?: commandContributionRegistry.Options) {
  const [logctx] = await logPlugin.initForTest()
  return [commandContributionRegistry(logctx, options), logctx.log] as const
}

it('creates as empty registory', async () => {
  const [r] = await setupTest()
  expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', async () => {
  const [r] = await setupTest([{ command: 'some.command' }])
  expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
  it('adds a new command', async () => {
    const [store] = await setupTest()
    const cmd = { command: 'a', description: 'a' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })
  it('logs an error and ignore if a command with the name ID already exist', async () => {
    const [store, log] = await setupTest()
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'a', description: 'a' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(log.reporter, '(ERROR) Registering a duplicate command contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  it('adds multiple commands', async () => {
    const [store] = await setupTest()
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'b', description: 'b' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})
