import logPlugin from '@just-web/log'
import * as contributionsModule from '@just-web/contributions'
import { initialize } from './context'

describe('initialize()', () => {
  test('basic case', async () => {
    const [{ log }] = await logPlugin.initForTest()
    const [{ contributions }] = await contributionsModule.initialize({ log })
    await initialize({ log, contributions })
  })

  it('supports predefined commands', async () => {
    const [{ log }] = await logPlugin.initForTest()
    const [{ contributions }] = await contributionsModule.initialize({ log })
    const d = log.getLogger('test')
    const [{ commands }] = await initialize({
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
