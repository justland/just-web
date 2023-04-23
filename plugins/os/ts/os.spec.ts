import { stub } from 'type-plus'
import { isMac } from './os.js'
import { ctx } from './os.ctx.js'

describe('isMac()', () => {
	it(`returns true for 'OS X'`, () => {
		ctx.os = stub<ctx.OperatingSystem>({ family: 'OS X' })
		expect(isMac()).toEqual(true)
	})

	it('returns false for `Windows`', () => {
		ctx.os = stub<ctx.OperatingSystem>({ family: 'Windows' })
		expect(isMac()).toEqual(false)
	})

	it('returns false for no os', () => {
		ctx.os = undefined
		expect(isMac()).toEqual(false)
	})
})
