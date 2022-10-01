import logPlugin from '@just-web/log'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'

import plugin, { CommandPalette } from '.'

test('exports', () => {
  expect(CommandPalette).toBeDefined()
})

describe('plugin', () => {
  it('registers `just-web.showCommandPalette` handler', () => {
    const [{ log }] = logPlugin.initForTest()
    const [{ contributions }] = contributionsPlugin.init({ log })
    const [{ commands }] = commandsPlugin.init({ log, contributions })
    plugin.init({ log, commands })
    expect(commands.keys()).toEqual(['just-web.showCommandPalette'])
  })
})
