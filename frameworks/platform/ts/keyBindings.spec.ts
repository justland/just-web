import { commandRegistry } from '@just-web/commands'
import { CommandContribution, commandContributionRegistry, KeyBindingContribution, keyBindingRegistry } from '@just-web/contributions'
import { configForTest, MemoryLogReporter } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import mousetrap from 'mousetrap'
import { startKeyBindings } from './keyBindings'

interface StubCommand extends KeyBindingContribution, CommandContribution {
  handler(command: KeyBindingContribution & CommandContribution): void
}
function stubOptions(...stubCommands: StubCommand[]) {
  const contributions = {
    commands: commandContributionRegistry(),
    keyBindings: keyBindingRegistry()
  }
  const commands = commandRegistry({ contributions })

  stubCommands.forEach(stubCommand => {
    contributions.commands.add(stubCommand)
    contributions.keyBindings.add(stubCommand)
    commands.register(
      stubCommand.command,
      () => stubCommand.handler(stubCommand))
  })
  return { commands, contributions }
}

let reporter: MemoryLogReporter
beforeEach(() => {
  mousetrap.reset()
  reporter = configForTest().reporter
})

test('trigger command', () => {
  const invoked: string[] = []
  const options = stubOptions({
    command: 'just-test.showJob',
    description: 'show job',
    key: 'ctrl+j',
    handler(cmd) { invoked.push(cmd.description!) }
  })
  startKeyBindings(options)

  mousetrap.trigger('ctrl+j')
  expect(invoked).toEqual(['show job'])
})

test('trigger cmd command', () => {
  const invoked: string[] = []
  const options = stubOptions({
    command: 'just-test.showJob',
    description: 'show job',
    key: 'cmd+j',
    handler(cmd) { invoked.push(cmd.description!) }
  })
  startKeyBindings(options)

  // mousetrap takes `command+` instead of `cmd+`
  mousetrap.trigger('command+j')
  expect(invoked).toEqual(['show job'])
})

test('emit warning for duplicate key binding', () => {
  const options = stubOptions({
    command: 'just-test.showJob',
    description: 'show job',
    key: 'ctrl+j',
    handler() { }
  }, {
    command: 'just-test.diffJob',
    description: 'another command',
    key: 'ctrl+j',
    handler() { }
  })
  startKeyBindings(options)

  logEqual(reporter, '(WARN) Registering a duplicate key binding, ignored: just-test.diffJob - ctrl+j')
})
