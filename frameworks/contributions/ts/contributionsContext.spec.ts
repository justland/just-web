import { createLogContext } from '@just-web/log'
import { createContributionsContext } from './contributionsContext'

describe('createContributionsContext()', () => {
  test('returns commands', () => {
    const ctx = createLogContext({ name: 'test' })
    const { commands, keyBindings } = createContributionsContext(
      ctx,
      { commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
