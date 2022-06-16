import { logLevels } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import createApp, { createTestApp } from '.'

describe('createApp()', () => {
  // will be removed. The app and context will be frozen
  test('modifying app would affect context received by plugin', async () => {
    const expected = () => true
    const app = createApp({ name: 'test', log: {} })
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

  it('send startContext to start()', async () => {
    const app = await createTestApp().addPlugin({
      async activate() {
        return [{}, { a: 1 }]
      },
      async start(startContext) {
        expect(startContext).toEqual({ a: 1 })
      }
    })

    await app.start()
  })
  it('can get undefined for no context', async () => {
    const app = await createTestApp().addPlugin({
      async activate() {
        return [undefined, { a: 1 }]
      },
      async start(startContext) {
        expect(startContext).toEqual({ a: 1 })
      }
    })

    await app.start()
  })
})

describe('createTestApp()', () => {
  it('can specify log options', () => {
    const app = createTestApp({ log: { logLevel: logLevels.all } })
    expect(app.log.logLevel).toBe(logLevels.all)
    logMatchSome(app.log.reporter, '(TRACE) create test log context')
  })
})
