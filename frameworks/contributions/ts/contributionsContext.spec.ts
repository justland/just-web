import { createLogContext, initializeForTest } from '@just-web/log'
import { createContributionsContext, initialize } from './contributionsContext'

describe('createContributionsContext()', () => {
  test('returns commands', () => {
    const ctx = createLogContext({ name: 'test' })
    const { contributions: { commands, keyBindings } } = createContributionsContext(ctx)
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})

describe(initialize.name, () => {
  it('returns contributions in PluginContext', async () => {
    const [{ log }] = await initializeForTest()
    const [{ contributions }] = await initialize({ log })
    expect(contributions).toBeDefined()
    expect(contributions.commands).toBeDefined()
    expect(contributions.keyBindings).toBeDefined()
  })

  it('can prefill commands', async () => {
    const [{ log }] = await initializeForTest()
    const [{ contributions }] = await initialize({
      log, options: {
        commands: [{ command: 'a' }]
      }
    })
    expect(contributions.commands.keys()).toEqual(['a'])
  })
})
