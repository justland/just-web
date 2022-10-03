import contributionsPlugin from '@just-web/contributions'
import { logPluginForTest } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import commandsPlugin from '.'

describe('initialize()', () => {
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
})
