import { logPluginForTest } from '@just-web/log'
import plugin from '.'

describe(`default().init()`, () => {
  it('can omit options', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ browser }] = plugin().init({ log })

    expect(browser.errors).toBeDefined()
  })
})
