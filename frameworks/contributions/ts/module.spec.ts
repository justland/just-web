import { start } from './module'

describe('start()', () => {
  test('returns commands', () => {
    const { commands, keyBindings } = start({ commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
