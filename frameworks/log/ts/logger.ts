import { getLogger, type LogMethodNames } from 'standard-log'
import type { LogGizmo } from './log_gizmo.js'

/**
 * Creates a function that returns a logger with a prefixed id.
 *
 * @param context The log gizmo.
 * @param prefix The prefix to use.
 */
export function createPrefixedGetLogger<N extends string = LogMethodNames>(
	context: LogGizmo<N>,
	prefix: string
): typeof getLogger<N> {
	return function getLogger(id, options) {
		return context.log.getLogger(getLoggerID(prefix, id), options)
	}
}

/**
 * Creates a function that returns a non-console logger with a prefixed id.
 * @param context The log gizmo.
 * @param prefix The prefix to use.
 */
export function createPrefixedGetNonConsoleLogger<N extends string = LogMethodNames>(
	context: LogGizmo<N>,
	prefix: string
): typeof getLogger<N> {
	return function getNonConsoleLogger(id, options) {
		return context.log.getNonConsoleLogger(getLoggerID(prefix, id), options)
	}
}

function getLoggerID(prefix: string, id: string) {
	return id ? `${prefix}:${id}` : prefix
}
