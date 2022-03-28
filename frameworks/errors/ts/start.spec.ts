import { start } from './start'
import { getStore } from './store'

test('by default browser error prevent default is true', async () => {
  await start()

  const store = getStore()
  expect(store.browserErrors.preventDefault).toBe(true)
})
