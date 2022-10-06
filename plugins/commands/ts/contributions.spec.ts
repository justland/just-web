import { logTestPlugin } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { CommandContribution, formatCommand } from '.'
import { contributionRegistry } from './contributions'

function setupTest(options?: CommandContribution[]) {
  const [logctx] = logTestPlugin().init()
  return [contributionRegistry(logctx, options), logctx.log] as const
}

it('creates as empty registory', () => {
  const [r] = setupTest()
  expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', () => {
  const [r] = setupTest([{ command: 'some.command' }])
  expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
  it('adds a new command', () => {
    const [store] = setupTest()
    const cmd = { command: 'a', description: 'a' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })
  it('logs an error and ignore if a command with the name ID already exist', () => {
    const [store, log] = setupTest()
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'a', description: 'a' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(log.reporter, '(ERROR) Registering a duplicate command contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  it('adds multiple commands', () => {
    const [store] = setupTest()
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'b', description: 'b' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})

describe('formatCommand()', () => {
  const allDefinedCommand = {
    command: 'app.someCommand',
    name: 'Sing a song',
    description: 'Jingle Bell'
  }
  test('use defined name', () => {
    const a = formatCommand(allDefinedCommand)

    expect(a).toEqual({
      command: 'app.someCommand',
      name: 'Sing a song',
      description: 'Jingle Bell'
    })
  })

  test('create name from command as sentence case, skipping first category', () => {
    const a = formatCommand({ command: 'app.miku.singASong' })

    expect(a).toEqual({
      command: 'app.miku.singASong',
      name: 'Miku sing a song',
      description: undefined
    })
  })
})
