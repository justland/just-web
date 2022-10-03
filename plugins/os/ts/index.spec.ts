import { logPluginForTest } from '@just-web/log'
import plugin from '.'

describe(`default().init()`, () => {
  it('adds `os` to the applcation', () => {
    const [{ log }] = logPluginForTest().init()
    const [{ os }] = plugin().init({ log })

    expect(os.isMac).toBeDefined()
  })
})
