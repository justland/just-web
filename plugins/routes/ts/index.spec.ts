import {
  createApp
} from '@just-web/app'
import { createMemoryLogReporter, logLevels } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import routePlugin from './index.js'

describe('start()', () => {
  test('configure initial route', async () => {
    let called = false
    const app = await createApp({ name: 'test', log: { logLevel: logLevels.none } }).extend(routePlugin())
    app.routes.register('/intro', () => called = true)
    app.routes.config({ initialRoute: '/intro' })
    await app.start()
    expect(called).toBe(true)
  })
  test('needs to register route for `initialRoute`', async () => {
    const reporter = createMemoryLogReporter()
    const app = await createApp({ name: 'test', log: { reporters: [reporter] } }).extend(routePlugin())
    await app.start()
    logMatchSome(reporter,
      `(NOTICE) initializing @just-web/routes`,
      `(ERROR) navigate target not found: '/'`
    )
  })
})
