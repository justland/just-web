import { ctx, formatKeyBinding } from './keyBinding'

describe('formatKeyBinding()', () => {
  test(`in mac returns 'mac' key if defined`, () => {
    ctx.isMac = () => true
    const a = formatKeyBinding({ command: 'someCommand', mac: 'cmd+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'cmd+p'
    })
  })
  test(`in mac returns 'key' if 'mac' not defined`, () => {
    ctx.isMac = () => true
    const a = formatKeyBinding({ command: 'someCommand', key: 'ctrl+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'ctrl+p'
    })
  })
  test(`not in mac returns 'key'`, () => {
    ctx.isMac = () => false
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
