import { createTestApp } from '@just-web/app'
import { logEqual } from '@just-web/testing'
import * as routesModule from '.'

async function setupTest() {
  const app = createTestApp()
  return app.addPlugin(routesModule)
}


describe('registerRoute()', () => {
  test('register a route', async () => {
    const app = await setupTest()
    app.routes.register('/', () => { /* for SPA, here is where we render the app */ })
  })

  test('log an error if registering an already registered route', async () => {
    const app = await setupTest()
    app.routes.register('/debug', () => { })
    app.routes.register('/debug', () => { })
    logEqual(app.log.reporter, `(ERROR) Registering an already registered route: '/debug'`)
  })

  test('returns an unregister function', async () => {
    const app = await setupTest()
    const unregister = app.routes.register('/abc', () => { })
    unregister()
    expect(app.routes.hasRoute('/abc')).toBe(false)
  })
})

describe('navigate()', () => {
  test('navigate to an unknown route logs an error', async () => {
    const app = await setupTest()
    app.routes.navigate('/not-exist')
    logEqual(app.log.reporter, `(ERROR) navigate target not found: '/not-exist'`)
  })

  test('navigate route', async () => {
    const app = await setupTest()
    let called = false
    app.routes.register('/route1', () => called = true)
    app.routes.navigate('/route1')
    expect(called).toBe(true)
  })
})


describe('validateRoutes()', () => {
  test(`route '/' and '/error' are required`, async () => {
    const app = await setupTest()
    const a = await app.routes.validateRoutes()
    expect(a).toBe(false)

    logEqual(
      app.log.reporter,
      `(ERROR) route '/' is required`,
      `(ERROR) route '/error' is required`
    )
  })
})
