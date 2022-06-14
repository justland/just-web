import { createLogContext } from '@just-web/log'
import { createContributionsContext } from './contributionsContext'

describe('createContributionsContext()', () => {
  test('returns commands', () => {
    const logContext = createLogContext({ name: 'test' })
    const { commands, keyBindings } = createContributionsContext(
      { logContext },
      { commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
