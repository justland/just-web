import { registerCommand } from './commands'

describe('registerCommand()', () => {
  test('register a command', () => {
    registerCommand('just-web.commandPalette', {
      description: 'Open Command Palette',
      handler() { }
    })
  })

  test.todo('emit warning if registering with existing id', () => {

  })
})
