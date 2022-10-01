import logPlugin, { createLogContext } from '@just-web/log'
import contributionsPlugin, { createContributionsContext } from '.'

describe('createContributionsContext()', () => {
  test('returns commands', () => {
    const ctx = createLogContext({ name: 'test' })
    const { contributions: { commands, keyBindings } } = createContributionsContext(ctx)
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})

describe(`plugin.${contributionsPlugin.init.name}()`, () => {
  it('returns contributions in PluginContext', () => {
    const [{ log }] = logPlugin.initForTest()
    const [{ contributions }] = contributionsPlugin.init({ log })
    expect(contributions).toBeDefined()
    expect(contributions.commands).toBeDefined()
    expect(contributions.keyBindings).toBeDefined()
  })

  it('can prefill commands', () => {
    const [{ log }] = logPlugin.initForTest()
    const [{ contributions }] = contributionsPlugin.init({
      log, options: {
        contributions: {
          commands: [{ command: 'a' }]
        }
      }
    })
    expect(contributions.commands.keys()).toEqual(['a'])
  })
})
