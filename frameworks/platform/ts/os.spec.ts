import { stub } from 'type-plus'
import { isMac, PlatformCtx, platformCtx } from './os'

describe('isMac()', () => {
  test(`'OS X' is mac`, () => {
    platformCtx.os = stub<PlatformCtx['os']>({ family: 'OS X' })
    expect(isMac()).toEqual(true)
  })

  test('`Windows` is not mac', () => {
    platformCtx.os = stub<PlatformCtx['os']>({ family: 'Windows' })
    expect(isMac()).toEqual(false)
  })
})
