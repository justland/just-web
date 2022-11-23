import commandsPlugin, { CommandContribution } from '@just-web/commands'
import keyboardPlugin, {
  KeyBindingContribution
} from '@just-web/keyboard'
import { logTestPlugin } from '@just-web/log'
import osPlugin from '@just-web/os'
import { logEqual } from '@just-web/testing'
import mousetrap from 'mousetrap'
import { startKeyBindings } from './keyBindings.js'

type StubCommand = KeyBindingContribution & CommandContribution & {
  handler(command: KeyBindingContribution & CommandContribution): void
}

function setupTest(...stubCommands: StubCommand[]) {
  const [{ log }] = logTestPlugin().init()
  const [{ keyboard }] = keyboardPlugin().init({ log })
  const [{ commands }] = commandsPlugin().init({ log, keyboard })
  const [{ os }] = osPlugin().init({ log })

  stubCommands.forEach(stubCommand => {
    commands.contributions.add(stubCommand)
    commands.handlers.register(
      stubCommand.id,
      () => stubCommand.handler(stubCommand))
    keyboard.keyBindingContributions.add(stubCommand)
  })
  return {
    os,
    log,
    commands,
    keyboard
  }
}

beforeEach(() => { mousetrap.reset() })

test('trigger command', () => {
  const invoked: string[] = []
  const options = setupTest({
    id: 'just-test.showJob',
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
    id: 'just-test.showJob',
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
    id: 'just-test.showJob',
    description: 'show job',
    key: 'ctrl+j',
    handler() { }
  }, {
    id: 'just-test.diffJob',
    description: 'another command',
    key: 'ctrl+j',
    handler() { }
  })
  startKeyBindings(options)

  logEqual(options.log.reporter,
    '(WARN) Registering a duplicate key binding, ignored: just-test.diffJob - ctrl+j'
  )
})
