import { CommandContribution, createContributionsContext } from '@just-web/contributions'
import { createTestLogContext } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { isType } from 'type-plus'
import { commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

function setupTest(...commands: CommandContribution[]) {
  const logContext = createTestLogContext()
  const contributions = createContributionsContext({ logContext }, {
    commands: commands.reduce<Record<string, CommandContribution>>(
      (p, cmd) => (p[cmd.command] = cmd, p),
      {})
  })
  return { contributions, logContext }
}

describe('register()', () => {
  it('registers a new command', () => {
    const { logContext } = setupTest()
    const r = commandRegistry({ logContext })
    r.register('some.Command', () => { })

    expect(r.keys()).toEqual(['some.Command'])
  })

  it('emits a warning if registering a command with existing id', () => {
    const { logContext } = setupTest()
    const r = commandRegistry({ logContext })
    r.register('just-web.showCommandPalette', () => { })
    r.register('just-web.showCommandPalette', () => { })
    logEqual(logContext.reporter, `(WARN) Registering a duplicate command, ignored: just-web.showCommandPalette`)
  })

  it('can register a command taking params', () => {
    const { contributions, logContext } = setupTest()
    contributions.commands.add({ command: 'just-web.editFile', description: 'a' })
    const r = commandRegistry({ logContext })
    let actual: string
    r.register('just-web.editFile', (file: string) => actual = `editing ${file}`)
    r.invoke('just-web.editFile', 'abc.txt')
    expect(actual!).toEqual('editing abc.txt')
  })
})

describe('keys()', () => {
  test('empty to begin with', () => {
    const r = commandRegistry(setupTest())
    const cmds = r.keys()
    expect(cmds.length).toBe(0)
  })

  test('get registered commands', () => {
    const r = commandRegistry(setupTest(
      { command: 'cmd1', description: 'cmd1' },
      { command: 'cmd2', description: 'cmd2' }
    ))
    r.register('cmd1', () => { })
    r.register('cmd2', () => { })
    const cmds = r.keys()
    expect(cmds).toEqual(['cmd1', 'cmd2'])
  })
})

describe('invoke()', () => {
  test('invoke not registered command emits an error', () => {
    const { logContext } = setupTest()
    const r = commandRegistry({ logContext })
    r.invoke('not-exist')

    logEqual(logContext.reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
  })

  test('invoke command', () => {
    const fn = jest.fn()
    const r = commandRegistry(setupTest({ command: 'command1', description: 'a' }))
    r.register('command1', fn)
    r.invoke('command1')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('can invoke command with arguments', () => {
    const fn = jest.fn()
    const r = commandRegistry(setupTest({ command: 'command1', description: 'a' }))
    r.register('command1', fn)
    r.invoke('command1', 1)
    expect(fn).toHaveBeenCalledWith(1)
  })
})

describe('toReadonlyCommandRegistry()', () => {
  test('', () => {
    const registry = commandRegistry(setupTest())
    const a = toReadonlyCommandRegistry(registry)

    isType.equal<true, ReadonlyCommandRegistry, typeof a>()
    expect(Object.keys(a)).toEqual(['invoke', 'keys'])
  })
})
