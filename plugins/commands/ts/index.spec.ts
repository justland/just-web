import contributionsPlugin from '@just-web/contributions'
import { logPluginForTest } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import commandsPlugin, { showCommandPalette } from '.'
import { AssertOrder } from 'assertron'

describe('plugin.init()', () => {
  test('basic case', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })
    commandsPlugin().init({ log, contributions })
  })

  it('supports predefined commands', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })

    const d = log.getLogger('test')
    const [{ commands }] = commandsPlugin({
      commands: {
        'a': () => d.info('exec a'),
        'b': () => d.info('exec b')
      }
    }).init({ log, contributions })

    commands.invoke('a')
    commands.invoke('b')

    logEqual(log.reporter,
      '(NOTICE) init',
      '(NOTICE) init',
      '(INFO) exec a',
      '(INFO) exec b'
    )
  })

  it('provides showCommandPalette()', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })
    const [{ commands }] = commandsPlugin().init({ log, contributions })
    const o = new AssertOrder(1)
    commands.register(showCommandPalette.type, () => o.once(1))

    commands.showCommandPalette()
    o.end()
  })
})
