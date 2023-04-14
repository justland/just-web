import { DEFAULT_LOG_METHOD_NAMES, type Logger, type LogMethodNames, type StandardLog } from 'standard-log'
import type { LogGizmoOptions } from './log_gizmo.types.js'

export function buildLogContext<N extends string = LogMethodNames>(
	name: string,
	sl: StandardLog<N>,
	options?: LogGizmoOptions<N>
) {
	const log = {
		...sl,
		getLogger(id, options) {
			return sl.getLogger(getLoggerID(name, id), options)
		},
		getNonConsoleLogger(id, options) {
			return sl.getNonConsoleLogger(getLoggerID(name, id), options)
		}
	} as StandardLog<N> & Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'>

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
