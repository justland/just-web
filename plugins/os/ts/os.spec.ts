import { stub } from 'type-plus'
import { isMac } from './os.js'
import { ctx } from './os.ctx.js'

describe('isMac()', () => {
	test(`'OS X' is mac`, () => {
		ctx.os = stub<ctx.OperatingSystem>({ family: 'OS X' })
		expect(isMac()).toEqual(true)
	})

	test('`Windows` is not mac', () => {
		ctx.os = stub<ctx.OperatingSystem>({ family: 'Windows' })
		expect(isMac()).toEqual(false)
	})
})
