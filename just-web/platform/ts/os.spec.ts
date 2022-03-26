import { stub } from 'type-plus'
import { isMacOS, Platform } from './os'

describe('isMac()', () => {
  test(`'OS X' is mac`, () => {
    const platform = stub<Platform>({ os: { family: 'OS X' } })
    expect(isMacOS({ platform })).toEqual(true)
  })

  test('`Windows` is not mac', () => {
    const platform = stub<Platform>({ os: { family: 'Windows' } })
    expect(isMacOS({ platform })).toEqual(false)
  })
})
