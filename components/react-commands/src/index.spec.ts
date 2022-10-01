import logPlugin from '@just-web/log'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'

import plugin, { CommandPalette } from '.'

test('exports', () => {
  expect(CommandPalette).toBeDefined()
})

describe('plugin', () => {
  it('registers `just-web.showCommandPalette` handler', async () => {
    const [{ log }] = await logPlugin.initForTest()
    const [{ contributions }] = await contributionsPlugin.init({ log })
    const [{ commands }] = await commandsPlugin.init({ log, contributions })
    await plugin.init({ log, commands })
    expect(commands.keys()).toEqual(['just-web.showCommandPalette'])
  })
})
