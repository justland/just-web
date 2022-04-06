import { create } from './module'

describe('start()', () => {
  test('returns commands', () => {
    const { commands, keyBindings } = create({ commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
