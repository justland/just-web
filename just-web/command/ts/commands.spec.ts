import { configForTest, MemoryLogReporter } from 'standard-log'
import { registerCommand } from './commands'
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
    registerCommand('command1', { description: '', handler() { } })
    registerCommand('command1', { description: '', handler() { } })
    expect(reporter.getLogMessageWithLevel()).toEqual(`(WARN) The command 'command1' was already registered`)
  })
})
