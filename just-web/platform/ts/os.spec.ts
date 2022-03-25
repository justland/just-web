import platform from 'platform'
import { RecursivePartial } from 'type-plus'
import { isMacOS } from './os'

describe('isMac()', () => {
  test(`'OS X' is mac`, () => {
    const platform = stub({ os: { family: 'OS X' } })
    expect(isMacOS({ platform })).toEqual(true)
  })

  test('`Windows` is not mac', () => {
    const platform = stub({ os: { family: 'Windows' } })
    expect(isMacOS({ platform })).toEqual(false)
  })
})

function stub(stub: RecursivePartial<typeof platform>) {
  return stub as typeof platform
}
