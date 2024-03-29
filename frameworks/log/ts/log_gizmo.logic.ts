import type { GizmoStandardLog, LogGizmoOptions } from './log_gizmo.types.js'
import {
	DEFAULT_LOG_METHOD_NAMES,
	type LoggerOptions,
	type LogMethodNames,
	type StandardLog
} from './standard_log.js'

export function buildLogContext<N extends string = LogMethodNames>(
	name: string,
	sl: StandardLog<N>,
	options?: LogGizmoOptions<N>
) {
	const log = {
		...sl,
		getLogger(id?: string, options?: LoggerOptions) {
			return sl.getLogger(id ? getLoggerID(name, id) : name, options)
		},
		getNonConsoleLogger(id: string, options?: LoggerOptions) {
			return sl.getNonConsoleLogger(getLoggerID(name, id), options)
		}
	} as unknown as GizmoStandardLog<N>

	const appLogger = sl.getLogger(name)
	const logMethods = DEFAULT_LOG_METHOD_NAMES.concat(Object.keys(options?.customLevels ?? {})).concat([
		'on',
		'count'
	])
	logMethods.forEach(m => ((log as any)[m] = (appLogger as any)[m].bind(appLogger)))
	return log
}

function getLoggerID(prefix: string, id: string) {
	return `${prefix}:${id}`
}
