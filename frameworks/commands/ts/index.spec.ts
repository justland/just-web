import logPlugin from '@just-web/log'
import contributionsPlugin from '@just-web/contributions'
import commandsPlugin from '.'

describe('initialize()', () => {
  test('basic case', () => {
    const [{ log }] = logPlugin.initForTest()
    const [{ contributions }] = contributionsPlugin.init({ log })
    commandsPlugin.init({ log, contributions })
  })

  it('supports predefined commands', () => {
    const [{ log }] = logPlugin.initForTest()
    const [{ contributions }] = contributionsPlugin.init({ log })
    const d = log.getLogger('test')
    const [{ commands }] = commandsPlugin.init({
      log, contributions, options: {
        commands: {
          'a': () => d.info('exec a'),
          'b': () => d.info('exec b')
        }
      }
    })
    commands.invoke('a')
    commands.invoke('b')
    expect(log.reporter.getLogMessages()).toEqual([
      'exec a',
      'exec b'
    ])
  })
})
