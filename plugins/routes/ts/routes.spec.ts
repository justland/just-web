import { createContext, createTestLogContext } from '@just-web/app'
import { logEqual } from '@just-web/testing'
import { activate } from './module'

async function setupTest() {
  const logContext = createTestLogContext()
  const context = createContext({ logContext })
  return [logContext, await activate(context)] as const
}


describe('registerRoute()', () => {
  test('register a route', async () => {
    const [, [{ routes: { register } }]] = await setupTest()
    register('/', () => { /* for SPA, here is where we render the app */ })
  })

  test('log an error if registering an already registered route', async () => {
    const [{ reporter }, [{ routes: { register } }]] = await setupTest()
    register('/debug', () => { })
    register('/debug', () => { })
    logEqual(reporter, `(ERROR) Registering an already registered route: '/debug'`)
  })

  test('returns an unregister function', async () => {
    const [, [{ routes: { register, hasRoute } }]] = await setupTest()
    const unregister = register('/abc', () => { })
    unregister()
    expect(hasRoute('/abc')).toBe(false)
  })
})

describe('navigate()', () => {
  test('navigate to an unknown route logs an error', async () => {
    const [{ reporter }, [{ routes: { navigate } }]] = await setupTest()
    navigate('/not-exist')
    logEqual(reporter, `(ERROR) navigate target not found: '/not-exist'`)
  })

  test('navigate route', async () => {
    const [, [{ routes: { register, navigate } }]] = await setupTest()
    let called = false
    register('/route1', () => called = true)
    navigate('/route1')
    expect(called).toBe(true)
  })
})


describe('validateRoutes()', () => {
  test(`route '/' and '/error' are required`, async () => {
    const [{ reporter }, [{ routes: { validateRoutes } }]] = await setupTest()
    const a = await validateRoutes()
    expect(a).toBe(false)

    logEqual(
      reporter,
      `(ERROR) route '/' is required`,
      `(ERROR) route '/error' is required`
    )
  })
})
