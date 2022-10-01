import browserPlugin from '@just-web/browser'
import osPlugin from '@just-web/os'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin, {
  CommandContribution, KeyBindingContribution
} from '@just-web/contributions'
import logPlugin from '@just-web/log'
import { logEqual } from '@just-web/testing'
import mousetrap from 'mousetrap'
import { startKeyBindings } from './keyBindings'

type StubCommand = KeyBindingContribution & CommandContribution & {
  handler(command: KeyBindingContribution & CommandContribution): void
}

function setupTest(...stubCommands: StubCommand[]) {
  const [{ log }] = logPlugin.initForTest()
  const [{ contributions }] = contributionsPlugin.init({ log })
  const [{ commands }] = commandsPlugin.init({ log, contributions })
  const [{ browser }] = browserPlugin.init({})
  const [{ os }] = osPlugin.init({})

  stubCommands.forEach(stubCommand => {
    contributions.commands.add(stubCommand)
    contributions.keyBindings.add(stubCommand)
    commands.register(
      stubCommand.command,
      () => stubCommand.handler(stubCommand))
  })
  return {
    browser,
    os,
    log,
    commands,
    contributions
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

test('emit warning for duplicate key binding', async () => {
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
