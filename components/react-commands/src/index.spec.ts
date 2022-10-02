import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { logPluginForTest } from '@just-web/log'

import plugin, { CommandPalette } from '.'

test('exports', () => {
  expect(CommandPalette).toBeDefined()
})

describe('plugin', () => {
  it('registers `just-web.showCommandPalette` handler', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })
    const [{ commands }] = commandsPlugin().init({ log, contributions })
    plugin().init({ log, commands })
    expect(commands.keys()).toEqual(['just-web.showCommandPalette'])
  })
})
