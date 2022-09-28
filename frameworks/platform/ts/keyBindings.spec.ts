import { commandRegistry } from '@just-web/commands'
import { CommandContribution, commandContributionRegistry, KeyBindingContribution, keyBindingRegistry } from '@just-web/contributions'
import { createTestLogContext } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import mousetrap from 'mousetrap'
import { createPlatformContext } from './context'
import { startKeyBindings } from './keyBindings'

interface StubCommand extends KeyBindingContribution, CommandContribution {
  handler(command: KeyBindingContribution & CommandContribution): void
}
function setupTest(...stubCommands: StubCommand[]) {
  const logContext = createTestLogContext()

  const contributions = {
    commands: commandContributionRegistry({ logContext }),
    keyBindings: keyBindingRegistry({ logContext })
  }
  const commands = commandRegistry({ logContext })

  stubCommands.forEach(stubCommand => {
    contributions.commands.add(stubCommand)
    contributions.keyBindings.add(stubCommand)
    commands.register(
      stubCommand.command,
      () => stubCommand.handler(stubCommand))
  })
  return {
    log: logContext,
    commands,
    contributions,
    platform: createPlatformContext()
  }
}

beforeEach(() => { mousetrap.reset() })

test('trigger command', () => {
  const invoked: string[] = []
  const options = setupTest({
    command: 'just-test.showJob',
    description: 'show job',
    key: 'ctrl+j',
    handler(cmd) { invoked.push(cmd.description!) },
  })
  startKeyBindings(options)

  mousetrap.trigger('ctrl+j')
  expect(invoked).toEqual(['show job'])
})

test('trigger cmd command', () => {
  const invoked: string[] = []
  const options = setupTest({
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
  const options = setupTest({
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

  logEqual(options.log.reporter, '(WARN) Registering a duplicate key binding, ignored: just-test.diffJob - ctrl+j')
})
