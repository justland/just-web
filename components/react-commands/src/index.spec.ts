import commandsPlugin from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard'
import { logTestPlugin } from '@just-web/log'
import { osTestPlugin } from '@just-web/os'

import plugin, { CommandPalette } from '.'

test('exports', () => {
  expect(CommandPalette).toBeDefined()
})

describe('plugin', () => {
  it('registers `just-web.showCommandPalette` handler', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ keyboard }] = keyboardPlugin().init({ log })
    const [{ commands }] = commandsPlugin().init({ log, keyboard })
    const [{ os }] = osTestPlugin().init({ log })
    plugin().init({ log, keyboard, commands, os })
    expect(commands.commands.keys()).toEqual(['just-web.showCommandPalette'])
  })
})
