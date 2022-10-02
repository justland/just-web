import { logLevels } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import { range } from 'ramda'
import { record } from 'type-plus'
import createApp, { createTestApp } from '.'

describe('createApp()', () => {
  it('comes with a random appID', () => {
    const x = range(0, 100)
      .map(() => createApp({ name: 'random' }).appID)
      .reduce((p, v) => (p[v] = true, p), record())

    expect(Object.keys(x).length).toBe(100)
  })

  test('appID is 15 chars long', () => {
    range(0, 100).forEach(() => expect(createApp({ name: 'x' }).appID.length).toEqual(15))
  })

  it.todo('is frozen')

  describe('addPlugin()', () => {
    it('throws if the plugin try to add property coliding with existing context', async () => {
      // const app = createApp({ name: 'a' })
    })
  })

  it('send startContext to start()', async () => {
    const app = await createTestApp().addPlugin({
      async activate() {
        return [{ b: 1 }, { a: 1 }]
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
