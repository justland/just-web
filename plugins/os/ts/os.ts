import { ctx } from './os.ctx.js'

export function isMac() {
	return ctx.os?.family === 'OS X'
}
