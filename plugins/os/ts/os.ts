import { ctx } from './os.ctx.js'

/**
 * Checks if the current operating system is macOS.
 *
 * @return {boolean} Returns true if the operating system is macOS, otherwise false.
 */
export function isMac() {
	return ctx.os?.family === 'OS X'
}
