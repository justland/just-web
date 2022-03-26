import { configForTest, MemoryLogReporter } from 'standard-log'
import { stub } from 'type-plus'
import { invokeCommand, registerCommand } from '.'
import { CommandRegistration } from './commands'
import { commands } from './store'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('registerCommand()', () => {
  beforeEach(() => commands.clear())

  test('register a command', () => {
    registerCommand('just-web.commandPalette', {
      description: 'Open Command Palette',
      handler() { }
    })
  })

  test('emit warning if registering with existing id', () => {
    registerCommand('command1', stub<CommandRegistration>())
    registerCommand('command1', stub<CommandRegistration>())
    expect(reporter.getLogMessageWithLevel()).toEqual(`(WARN) Registering an already registered command: 'command1'`)
  })
})

describe('invokeCommand()', () => {
  beforeEach(() => commands.clear())

  test('invoke not registered command emits an error', () => {
    invokeCommand('not-exist')

    expect(reporter.getLogMessageWithLevel()).toEqual(`(ERROR) Invoking not registered command: 'not-exist'`)
  })

  test('invoke command', () => {
    let called = false
    registerCommand('command1', stub<CommandRegistration>({ handler: () => called = true }))
    invokeCommand('command1')
    expect(called).toBe(true)
  })
})
