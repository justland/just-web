import { assertLog } from '@just-web/testing'
import { configForTest, MemoryLogReporter } from 'standard-log'
import { stub } from 'type-plus'
import { clearCommands, CommandRegistration, getCommands, invokeCommand, registerCommand } from '.'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('registerCommand()', () => {
  beforeEach(clearCommands)

  test('register a command', () => {
    registerCommand('just-web.commandPalette', {
      description: 'Open Command Palette',
      handler() { }
    })
  })

  test('log a warning if registering with existing id', () => {
    registerCommand('command1', stub<CommandRegistration>())
    registerCommand('command1', stub<CommandRegistration>())
    assertLog(reporter, `(WARN) Registering an already registered command: 'command1'`)
  })
})

describe('invokeCommand()', () => {
  beforeEach(clearCommands)

  test('invoke not registered command emits an error', () => {
    invokeCommand('not-exist')

    assertLog(reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
  })

  test('invoke command', () => {
    let called = false
    const cmd = stub<CommandRegistration>({ handler: () => called = true })
    registerCommand('command1', cmd)
    invokeCommand('command1')
    expect(called).toBe(true)
  })
})

describe('getCommands', () => {
  beforeEach(clearCommands)

  test('empty at the beginning', () => {
    const cmds = getCommands()
    expect(cmds).toEqual([])
  })

  test('get registered commands', () => {
    registerCommand('cmd1', stub<CommandRegistration>())
    registerCommand('cmd2', stub<CommandRegistration>())
    const cmds = getCommands()
    expect(cmds).toEqual([{ id: 'cmd1' }, { id: 'cmd2' }])
  })
})
