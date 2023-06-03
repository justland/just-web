import { getLogger, type LogGizmo, type Logger } from '@just-web/app'
import { isType } from 'type-plus'
import type { ErrorStore } from './error_store.types.js'
import { BrowserError } from './errors.js'

export namespace registerOnErrorHandler {
	export interface Options {
		errors: ErrorStore
		preventDefault: boolean
	}
	export interface Meta {
		logger: Logger
	}
}

export function registerOnErrorHandler(options: registerOnErrorHandler.Options, gizmo?: LogGizmo): void
export function registerOnErrorHandler(
	options: registerOnErrorHandler.Options,
	meta?: registerOnErrorHandler.Meta
): void
export function registerOnErrorHandler(
	{ errors, preventDefault }: registerOnErrorHandler.Options,
	gizmoOrMeta?: LogGizmo | registerOnErrorHandler.Meta
): void {
	const logger = pickLogger(gizmoOrMeta)

	window.addEventListener('error', ev => {
		if (preventDefault) ev.preventDefault()
		const e = new BrowserError(ev.message, ev.filename, ev.lineno, ev.colno, ev.error)
		errors.add(e)
		logger.error(`onerror detected`, e)
		return preventDefault
	})
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
