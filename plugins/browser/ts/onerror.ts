import { LogGizmo, Logger, getLogger } from '@just-web/log'
import type { ErrorStore } from './errorStore.js'
import { BrowserError } from './errors.js'
import { ctx } from './onerror.ctx.js'
import { isType } from 'type-plus'

export namespace registerOnErrorHandler {
	export type Options = {
		errors: ErrorStore
		preventDefault: boolean
	}
	export type Gizmo = LogGizmo
	export type Meta = { logger: Logger }
}

export function registerOnErrorHandler(
	options: registerOnErrorHandler.Options,
	gizmo?: registerOnErrorHandler.Gizmo
): void
export function registerOnErrorHandler(
	options: registerOnErrorHandler.Options,
	meta?: registerOnErrorHandler.Meta
): void
export function registerOnErrorHandler(
	{ errors, preventDefault }: registerOnErrorHandler.Options,
	gizmoOrMeta?: registerOnErrorHandler.Gizmo | registerOnErrorHandler.Meta
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

function pickLogger(gizmoOrMeta?: registerOnErrorHandler.Gizmo | registerOnErrorHandler.Meta): Logger {
	if (isType<registerOnErrorHandler.Gizmo>(gizmoOrMeta, x => x?.log)) {
		return gizmoOrMeta.log.getLogger('@just-web/browser')
	}
	if (isType<registerOnErrorHandler.Meta>(gizmoOrMeta, x => x?.logger)) {
		return gizmoOrMeta.logger
	}
	return getLogger('@just-web/browser')
}
