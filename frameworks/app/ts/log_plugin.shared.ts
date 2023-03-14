import {
	DEFAULT_LOG_METHOD_NAMES, type LogMethodNames, type StandardLog
} from 'standard-log'
import { getLoggerID } from './logger.js'
import { LogOptions, LogPlugin } from './log_plugin.types.js'
import { PluginContext } from './plugin.types.js'

export function buildLogContext<N extends string = LogMethodNames>(
	name: string,
	sl: StandardLog<N>,
	options?: LogOptions<N>
) {
	const log = {
		...sl,
		getLogger(id, options) {
			return sl.getLogger(getLoggerID(name, id), options)
		},
		getNonConsoleLogger(id, options) {
			return sl.getNonConsoleLogger(getLoggerID(name, id), options)
		}
	} as PluginContext<LogPlugin<N>>['log']

	const appLogger = sl.getLogger(name)
	const logMethods = DEFAULT_LOG_METHOD_NAMES.concat(Object.keys(options?.log?.customLevels ?? {})).concat([
		'on',
		'count'
	])
	logMethods.forEach(m => ((log as any)[m] = (appLogger as any)[m].bind(appLogger)))
	return log
}
