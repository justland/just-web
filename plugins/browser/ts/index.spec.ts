import { logTestPlugin } from '@just-web/log'
import { AssertOrder } from 'assertron'
import plugin from '.'
import { ctx } from './index.ctx'

describe(`default().init()`, () => {
  it('can omit options', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ browser }] = plugin().init({ log })

    expect(browser.errors).toBeDefined()
  })

  it('sends preventDefault to registerOnErrorHandler', () => {
    const [{ log }] = logTestPlugin().init()
    const o = new AssertOrder(1)
    ctx.registerOnErrorHandler = (options) => {
      o.once(1)
      expect(options.preventDefault).toBe(true)
    }

    plugin({ browser: { preventDefault: true } }).init({ log })

    o.end()
  })
})
