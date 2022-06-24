import { StackTraceMeta } from '@just-func/types'
import { createStandardLog, Logger, LogMethodNames, LogReporter, ReporterFilter, StandardLogOptions } from 'standard-log'
import { omit } from 'type-plus'

export {
  createConsoleLogReporter, createMemoryLogReporter, createStandardLogForTest,
  createTimestampFormatter, formatLogLevel, getLogger, InvalidId, logLevels,
  plainLogFormatter, StandardLogError, suppressLogs,
  toConsoleMethod, toLogLevel, toLogLevelName, toMessageWithLevel
} from 'standard-log'
export type {
  ConsoleLogFormatter, ConsoleLogReporter, ConsoleLogReporterOptions,
  LogEntry, LogFilter, LogFormatter, LogFunction, Logger, LoggerOptions,
  LogLevel, LogMethod, LogMethodNames, LogReporter,
  LogReporterOptions, MemoryLogReporter, StandardLog, StandardLogOptions, TimestampFormat
} from 'standard-log'
export * from './context'

export namespace justLog {
  export interface Param<N extends string = LogMethodNames> extends StandardLogOptions<N> {
    /**
     * Name of the application.
     * When specified, it will be added to the name of the logger,
     * so that the logs can be associated with the application
     */
     name?: string
  }

  export interface GetLoggerOptions extends StackTraceMeta {
    id: string,
    level?: number,
    writeTo?: LogReporter | ReporterFilter
  }
}

export interface JustLog<N extends string = LogMethodNames> {
  logLevel: number,
  toLogLevelName(level: number): string,
  toLogLevel(name: N): number,
  getLogger(param: justLog.GetLoggerOptions): Logger<N>,
  error(...args: any[]): void,
  warn(...args: any[]): void,
  info(...args: any[]): void,
  debug(...args: any[]): void,
}

export function justLog<N extends string = LogMethodNames>(param?: justLog.Param<N>): JustLog<N> {
  const sl = createStandardLog<N>(param)
  const name = param?.name
  const getLogger = name
    ? function getLogger(param: justLog.GetLoggerOptions) { return sl.getLogger(`${name}:${param.id}`, omit(param, 'id')) }
    : function getLogger(param: justLog.GetLoggerOptions) { return sl.getLogger(param.id, omit(param, 'id')) }
  const logger = getLogger({ id: `just-web` })
  return {
    ...sl,
    getLogger,
    error: logger.error.bind(logger),
    warn: logger.warn.bind(logger),
    info: logger.info.bind(logger),
    debug: logger.debug.bind(logger),
  }
}
