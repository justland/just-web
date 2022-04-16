import { configForTest, createContext, MemoryLogReporter } from '@just-web/app'
import { assertLog } from '@just-web/testing'
import { activate } from './module'
import { clearRoutes, hasRoute, validateRoutes } from './routes'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

function activateModule() {
  const context = createContext()
  return activate(context)
}


describe('registerRoute()', () => {
  test('register a route', async () => {
    const { routes: { register } } = await activateModule()
    register('/', () => { /* for SPA, here is where we render the app */ })
  })

  test('log an error if registering an already registered route', async () => {
    const { routes: { register } } = await activateModule()
    register('/debug', () => { })
    register('/debug', () => { })
    assertLog(reporter, `(ERROR) Registering an already registered route: '/debug'`)
  })

  test('returns an unregister function', async () => {
    const { routes: { register } } = await activateModule()
    const unregister = register('/abc', () => { })
    unregister()
    expect(hasRoute('/abc')).toBe(false)
  })
})

describe('navigate()', () => {
  test('navigate to an unknown route logs an error', async () => {
    const { routes: { navigate } } = await activateModule()
    navigate('/not-exist')
    assertLog(reporter, `(ERROR) navigate target not found: '/not-exist'`)
  })

  test('navigate route', async () => {
    const { routes: { register, navigate } } = await activateModule()
    let called = false
    register('/route1', () => called = true)
    navigate('/route1')
    expect(called).toBe(true)
  })
})


describe('validateRoutes()', () => {
  beforeEach(clearRoutes)

  test(`route '/' and '/error' are required`, async () => {
    const a = await validateRoutes()
    expect(a).toBe(false)

    assertLog(
      reporter,
      `(ERROR) route '/' is required`,
      `(ERROR) route '/error' is required`
    )
  })
})
