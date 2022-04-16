import {
  configForTest, createContext, MemoryLogReporter
} from '@just-web/contexts'
import { assertLog } from '@just-web/testing'
import { activate, start } from './module'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('start()', () => {
  test('configure initial route', async () => {
    const context = createContext()
    const { routes } = await activate(context)
    let called = false
    routes.register('/intro', () => called = true)
    await start({ initialRoute: '/intro' })
    expect(called).toBe(true)
  })
  test('needs to register route for `initialRoute`', async () => {
    const context = createContext()
    await activate(context)
    await start()
    assertLog(reporter,
      `(ERROR) navigate target not found: '/'`
    )
  })
})
