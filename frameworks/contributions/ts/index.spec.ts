import { logPluginForTest } from '@just-web/log'
import contributionsPlugin from '.'

describe(`default().init()`, () => {
  it('returns contributions in PluginContext', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin().init({ log })
    expect(contributions).toBeDefined()
    expect(contributions.commands).toBeDefined()
    expect(contributions.keyBindings).toBeDefined()
  })

  it('can prefill commands', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ contributions }] = contributionsPlugin({
      contributions: {
        commands: [{ command: 'a' }]
      }
    }).init({ log })
    expect(contributions.commands.keys()).toEqual(['a'])
  })
})
