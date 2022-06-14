import { stub } from 'type-plus'
import { ctx, Ctx, isMac } from './os'

describe('isMac()', () => {
  test(`'OS X' is mac`, () => {
    ctx.os = stub<Ctx['os']>({ family: 'OS X' })
    expect(isMac()).toEqual(true)
  })

  test('`Windows` is not mac', () => {
    ctx.os = stub<Ctx['os']>({ family: 'Windows' })
    expect(isMac()).toEqual(false)
  })
})
