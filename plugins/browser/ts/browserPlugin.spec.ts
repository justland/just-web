import { logTestPlugin } from '@just-web/log'
import { AssertOrder } from 'assertron'
import browserPlugin from './index.js'
import { ctx } from './browserPlugin.ctx.js'

describe(`default().init()`, () => {
  it('can omit options', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ browser }] = browserPlugin().init({ log })

    expect(browser.errors).toBeDefined()
  })

  it('sends preventDefault to registerOnErrorHandler', () => {
    const [{ log }] = logTestPlugin().init()
    const o = new AssertOrder(1)
    ctx.registerOnErrorHandler = (options) => {
      o.once(1)
      expect(options.preventDefault).toBe(true)
    }

    browserPlugin({ browser: { preventDefault: true } }).init({ log })

    o.end()
  })
})
