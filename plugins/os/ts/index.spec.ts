import { logTestPlugin } from '@just-web/log'
import plugin from '.'

describe(`default().init()`, () => {
  it('adds `os` to the applcation', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ os }] = plugin().init({ log })

    expect(os.isMac).toBeDefined()
  })
})
