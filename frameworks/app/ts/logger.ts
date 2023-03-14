import { getLogger, type LogMethodNames } from 'standard-log'
import type { LogPlugin } from './log_plugin.types.js'
import type { PluginContext } from './plugin.types.js'

export function createPrefixedGetLogger<N extends string = LogMethodNames>(
	context: PluginContext<LogPlugin<N>>,
	prefix: string
): typeof getLogger<N> {
	return function getLogger(id, options) {
		return context.log.getLogger(getLoggerID(prefix, id), options)
	}
}

export function createPrefixedGetNonConsoleLogger<N extends string = LogMethodNames>(
	context: PluginContext<LogPlugin<N>>,
	prefix: string
): typeof getLogger<N> {
	return function getNonConsoleLogger(id, options) {
		return context.log.getNonConsoleLogger(getLoggerID(prefix, id), options)
	}
}

export function getLoggerID(prefix: string, id: string) {
	return id ? `${prefix}:${id}` : prefix
}
