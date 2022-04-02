import { start } from './module'

describe('start()', () => {
  test('returns commands', async () => {
    const { commands, keyBindings } = await start({ commands: {}, keyBindings: {} })
    expect(commands).toBeDefined()
    expect(keyBindings).toBeDefined()
  })
})
