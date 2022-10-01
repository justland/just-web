import logPlugin from '@just-web/log'
import contributionsPlugin from '@just-web/contributions'
import commandsPlugin from '.'

describe('initialize()', () => {
  test('basic case', async () => {
    const [{ log }] = await logPlugin.initForTest()
    const [{ contributions }] = await contributionsPlugin.init({ log })
    await commandsPlugin.init({ log, contributions })
  })

  it('supports predefined commands', async () => {
    const [{ log }] = await logPlugin.initForTest()
    const [{ contributions }] = await contributionsPlugin.init({ log })
    const d = log.getLogger('test')
    const [{ commands }] = await commandsPlugin.init({
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
