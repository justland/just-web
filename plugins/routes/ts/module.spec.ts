import {
  configForTest, createApp, MemoryLogReporter
} from '@just-web/app'
import { logMatchSome } from '@just-web/testing'
import * as routesModule from './module'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('start()', () => {
  test('configure initial route', async () => {
    let called = false
    const app = await createApp().addPlugin(routesModule)
    app.routes.register('/intro', () => called = true)
    app.routes.config({ initialRoute: '/intro' })
    await app.start()
    expect(called).toBe(true)
  })
  test('needs to register route for `initialRoute`', async () => {
    const app = await createApp().addPlugin(routesModule)
    await app.start()
    logMatchSome(reporter,
      `(ERROR) navigate target not found: '/'`
    )
  })
})
