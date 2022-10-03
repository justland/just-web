import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { logPluginForTest } from '@just-web/log'
import { osTestPlugin } from '@just-web/os'

import plugin, { CommandPalette } from '.'

test('exports', () => {
  expect(CommandPalette).toBeDefined()
})

describe('plugin', () => {
  it('registers `just-web.showCommandPalette` handler', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })
    const [{ commands }] = commandsPlugin().init({ log, contributions })
    const [{ os }] = osTestPlugin().init({ log })
    plugin().init({ log, commands, os })
    expect(commands.keys()).toEqual(['just-web.showCommandPalette'])
  })
})
