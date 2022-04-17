import createApp from '.'

describe('createApp()', () => {
  test('stubbing app would affect context received by plugin', async () => {
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
