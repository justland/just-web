import type { LogGizmo } from '@just-web/log'
import type { ErrorStore } from './errorStore.js'
import { BrowserError } from './errors.js'
import { ctx } from './onerror.ctx.js'

export namespace registerOnErrorHandler {
	export type Options = {
		errors: ErrorStore
		preventDefault: boolean
	} & LogGizmo
}

export function registerOnErrorHandler({ errors, preventDefault, log }: registerOnErrorHandler.Options) {
	const logger = log.getNonConsoleLogger('@just-web/browser')
	const window = ctx.getWindow()
	window.onerror = function justWebOnError(event, source, lineno, colno, error) {
		const e = new BrowserError(event, source, lineno, colno, error)
		errors.add(e)
		logger.error(`onerror detected`, e)
		return preventDefault
	}
}
