import { logTestPlugin } from '@just-web/log'
import osPlugin from './index.js'

describe(`default().init()`, () => {
  it('adds `os` to the applcation', () => {
    const [{ log }] = logTestPlugin().init()
    const [{ os }] = osPlugin().init({ log })

    expect(os.isMac).toBeDefined()
  })
})
