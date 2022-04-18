import { logLevels } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import createApp, { createTestApp } from '.'

describe('createApp()', () => {
  // will be removed. The app and context will be frozen
  test('modifying app would affect context received by plugin', async () => {
    const expected = () => true
    const app = createApp({ log: { mode: 'test' } })
    app.platform.isMac = expected
    let actual
    await app.addPlugin({
      async activate(ctx) {
        actual = ctx.platform.isMac
      }
    })
    expect(actual).toBe(expected)
  })
  test.todo('modifying context in plugin will not affect app')
})

describe('createTestApp()', () => {
  test('has reporter in log (using createTestLogContext())', () => {
    const app = createTestApp({ log: { logLevel: logLevels.all } })

    logMatchSome(app.log.reporter, '(TRACE) create test log context')
  })
})
