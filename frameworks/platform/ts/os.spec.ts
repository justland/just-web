import { stub } from 'type-plus'
import { isMacOS } from './os'

describe('isMac()', () => {
  test(`'OS X' is mac`, () => {
    const ctx = stub<isMacOS.Ctx>({ platform: { os: { family: 'OS X' } } })
    expect(isMacOS(ctx)).toEqual(true)
  })

  test('`Windows` is not mac', () => {
    const ctx = stub<isMacOS.Ctx>({ platform: { os: { family: 'Windows' } } })
    expect(isMacOS(ctx)).toEqual(false)
  })
})
