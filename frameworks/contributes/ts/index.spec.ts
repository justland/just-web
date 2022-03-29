import { commands, keyBindings } from '.'

test('exports', () => {
  expect(commands).toBeDefined()
  expect(keyBindings).toBeDefined()
})
