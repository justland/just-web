import { formatKeyBinding } from './keyBinding'

describe('formatKeyBinding()', () => {
  let ctx: typeof formatKeyBinding.ctx
  beforeAll(() => ctx = formatKeyBinding.ctx)
  afterEach(() => formatKeyBinding.ctx = ctx)

  test(`in mac returns 'mac' key if defined`, () => {
    formatKeyBinding.ctx = { isMac: () => true }
    const a = formatKeyBinding({ command: 'someCommand', mac: 'cmd+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'cmd+p'
    })
  })
  test(`in mac returns 'key' if 'mac' not defined`, () => {
    formatKeyBinding.ctx = { isMac: () => true }
    const a = formatKeyBinding({ command: 'someCommand', key: 'ctrl+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'ctrl+p'
    })
  })
  test(`not in mac returns 'key'`, () => {
    formatKeyBinding.ctx = { isMac: () => false }
    const a = formatKeyBinding({
      command: 'someCommand',
      mac: 'cmd+p',
      key: 'ctrl+p'
    })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'ctrl+p'
    })
  })
})
