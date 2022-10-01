import {
  createApp, createMemoryLogReporter
} from '@just-web/app'
import { logMatchSome } from '@just-web/testing'
import * as routesModule from '.'

describe('start()', () => {
  test('configure initial route', async () => {
    let called = false
    const app = await createApp({ name: 'test' }).addPlugin(routesModule)
    app.routes.register('/intro', () => called = true)
    app.routes.config({ initialRoute: '/intro' })
    await app.start()
    expect(called).toBe(true)
  })
  test('needs to register route for `initialRoute`', async () => {
    const reporter = createMemoryLogReporter()
    const app = await createApp({ name: 'test', log: { reporters: [reporter] } }).addPlugin(routesModule)
    await app.start()
    logMatchSome(reporter,
      `(ERROR) navigate target not found: '/'`
    )
  })
})
