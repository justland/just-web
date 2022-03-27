import { configForTest, MemoryLogReporter } from 'standard-log'
import { registerRoute } from '.'
import { assertLog } from './assertLog'
import { clearRoutes, hasRoute, navigate, validateRoutes } from './routes'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('registerRoute()', () => {
  test('register a route', () => {
    registerRoute('/', () => { /* for SPA, here is where we render the app */ })
  })

  test('log an error if registering an already registered route', () => {
    registerRoute('/debug', () => { })
    registerRoute('/debug', () => { })
    assertLog(reporter, `(ERROR) Registering an already registered route: '/debug'`)
  })

  test('returns an unregister function', () => {
    const unregister = registerRoute('/abc', () => { })
    unregister()
    expect(hasRoute('/abc')).toBe(false)
  })
})

describe('navigate()', () => {
  test('navigate to an unknown route logs an error', () => {
    navigate('/not-exist')
    assertLog(reporter, `(ERROR) navigate target not found: '/not-exist'`)
  })

  test('navigate route', () => {
    let called = false
    registerRoute('/route1', () => called = true)
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
