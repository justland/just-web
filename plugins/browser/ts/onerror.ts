import { getLogger, type LogGizmo, type Logger } from '@just-web/app'
import { isType } from 'type-plus'
import type { ErrorStore } from './error_store.types.js'
import { BrowserError } from './errors.js'
import { ctx } from './onerror.ctx.js'

export namespace registerOnErrorHandler {
	export type Options = {
		errors: ErrorStore
		preventDefault: boolean
	}
	export type Meta = { logger: Logger }
}

export function registerOnErrorHandler(
	options: registerOnErrorHandler.Options,
	gizmo?: LogGizmo
): void
export function registerOnErrorHandler(
	options: registerOnErrorHandler.Options,
	meta?: registerOnErrorHandler.Meta
): void
export function registerOnErrorHandler(
	{ errors, preventDefault }: registerOnErrorHandler.Options,
	gizmoOrMeta?: LogGizmo | registerOnErrorHandler.Meta
): void {
	const logger = pickLogger(gizmoOrMeta)
	const window = ctx.getWindow()
	const justWebOnError: OnErrorEventHandler = (event, source, lineno, colno, error) => {
		const e = new BrowserError(event, source, lineno, colno, error)
		errors.add(e)
		logger.error(`onerror detected`, e)
		return preventDefault
	}
	const lastOnError = window.onerror
	window.onerror = lastOnError
		? function (...args) {
				const lastPreventDefault = lastOnError(...args)
				const preventDefault = justWebOnError(...args)
				return lastPreventDefault || preventDefault
		  }
		: justWebOnError
}

function pickLogger(gizmoOrMeta?: LogGizmo | registerOnErrorHandler.Meta): Logger {
	if (isType<LogGizmo>(gizmoOrMeta, x => x?.log)) {
		return gizmoOrMeta.log.getLogger('@just-web/browser')
	}
	if (isType<registerOnErrorHandler.Meta>(gizmoOrMeta, x => x?.logger)) {
		return gizmoOrMeta.logger
	}
	return getLogger('@just-web/browser')
}
