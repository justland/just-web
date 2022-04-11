import { createContributionsContext } from './contributionsContext'

describe('createContributionsContext()', () => {
  test('returns commands', () => {
    const { commands, keyBindings } = createContributionsContext({ commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
