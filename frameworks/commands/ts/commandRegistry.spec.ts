import { CommandContribution, commandContributionRegistry } from '@just-web/contributions'
import { assertLog } from '@just-web/testing'
import { configForTest, MemoryLogReporter } from 'standard-log'
import { isType, stub } from 'type-plus'
import { commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

let reporter: MemoryLogReporter

beforeEach(() => reporter = configForTest().reporter)

function stubOptions(...commands: CommandContribution[]) {
  return stub<commandRegistry.Options>({
    contributions: {
      commands: commandContributionRegistry({
        commands: commands.reduce<Record<string, CommandContribution>>(
          (p, cmd) => (p[cmd.command] = cmd, p),
          {})
      }),
    }
  })
}

describe('register()', () => {
  test('register an unknown command', () => {
    const r = commandRegistry(stubOptions())
    r.register('some.unknownCommand', () => { })

    assertLog(reporter, `(ERROR) Registering an unknown command: some.unknownCommand`)
  })

  test('register a command', () => {
    const options = stubOptions()
    options.contributions.commands.add({ command: 'just-web.showCommandPalette', description: 'a' })
    const r = commandRegistry(options)
    r.register('just-web.showCommandPalette', () => { })

    expect(r.keys()).toEqual(['just-web.showCommandPalette'])
  })

  test('log a warning if registering with existing id', () => {
    const options = stubOptions()
    options.contributions.commands.add({ command: 'just-web.showCommandPalette', description: 'a' })
    const r = commandRegistry(options)
    r.register('just-web.showCommandPalette', () => { })
    r.register('just-web.showCommandPalette', () => { })
    assertLog(reporter, `(WARN) Registering a duplicate command, ignored: just-web.showCommandPalette`)
  })
})

describe('keys()', () => {
  test('empty to begin with', () => {
    const r = commandRegistry(stubOptions())
    const cmds = r.keys()
    expect(cmds.length).toBe(0)
  })

  test('get registered commands', () => {
    const r = commandRegistry(stubOptions(
      { command: 'cmd1', description: 'cmd1' },
      { command: 'cmd2', description: 'cmd2' },
    ))
    r.register('cmd1', () => { })
    r.register('cmd2', () => { })
    const cmds = r.keys()
    expect(cmds).toEqual(['cmd1', 'cmd2'])
  })
})

describe('invoke()', () => {
  test('invoke not registered command emits an error', () => {
    const r = commandRegistry(stubOptions())
    r.invoke('not-exist')

    assertLog(reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
  })

  test('invoke command', () => {
    const fn = jest.fn()
    const r = commandRegistry(stubOptions({ command: 'command1', description: 'a' }))
    r.register('command1', fn)
    r.invoke('command1')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('toReadonlyCommandRegistry()', () => {
  test('', () => {
    const registry = commandRegistry(stubOptions())
    const a = toReadonlyCommandRegistry(registry)

    isType.equal<true, ReadonlyCommandRegistry, typeof a>()
    expect(Object.keys(a)).toEqual(['invoke', 'keys'])
  })
})
