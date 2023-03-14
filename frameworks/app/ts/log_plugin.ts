import {
	createStandardLog, type LogMethodNames
} from 'standard-log'
import { buildLogContext } from './log_plugin.shared.js'
import { LogOptions } from './log_plugin.types.js'
import { definePlugin } from './plugin.js'

export {
	createConsoleLogReporter,
	createMemoryLogReporter,
	createStandardLogForTest,
	createTimestampFormatter,
	formatLogLevel,
	getLogger,
	InvalidId,
	logLevels,
	plainLogFormatter,
	StandardLogError,
	suppressLogs,
	toConsoleMethod,
	toLogLevel,
	toLogLevelName,
	toMessageWithLevel
} from 'standard-log'
export type {
	ConsoleLogFormatter,
	ConsoleLogReporter,
	ConsoleLogReporterOptions,
	GetLogger,
	LogEntry,
	LogFilter,
	LogFormatter,
	LogFunction,
	Logger,
	LoggerOptions,
	LogLevel,
	LogMethod,
	LogMethodNames,
	LogReporter,
	LogReporterOptions,
	MemoryLogReporter,
	StandardLog,
	StandardLogOptions,
	TimestampFormat
} from 'standard-log'

export const logPlugin = definePlugin(<N extends string = LogMethodNames>(options?: LogOptions<N>) => ({
	name: '@just-web/log',
	async define(ctx) {
		const sl = createStandardLog<N>(options?.log)
		return {
			log: buildLogContext<N>(ctx.name, sl, options)
		}
	}
}))
