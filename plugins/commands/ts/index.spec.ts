import keyboardPlugin from '@just-web/keyboard'
import { logTestPlugin } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import commandsPlugin, { justShowCommandPalette } from '.'
import { AssertOrder } from 'assertron'

describe('plugin.init()', () => {
  test('basic case', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ keyboard }] = keyboardPlugin().init({ log })
    commandsPlugin().init({ log, keyboard })
  })

  it('supports predefined commands', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ keyboard }] = keyboardPlugin().init({ log })

    const d = log.getLogger('test')
    const [{ commands }] = commandsPlugin({
      commands: {
        handlers: {
          'a': () => d.info('exec a'),
          'b': () => d.info('exec b')
        }
      }
    }).init({ log, keyboard })

    commands.handlers.invoke('a')
    commands.handlers.invoke('b')

    logEqual(log.reporter,
      '(INFO) exec a',
      '(INFO) exec b'
    )
  })

  it('provides showCommandPalette()', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ keyboard }] = keyboardPlugin().init({ log })
    const [{ commands }] = commandsPlugin().init({ log, keyboard })
    const o = new AssertOrder(1)
    commands.handlers.register(justShowCommandPalette.id, () => o.once(1))

    commands.showCommandPalette()
    o.end()
  })
})
