import type { StackTraceMeta } from '@just-func/types'
import { AppBaseContext } from '@just-web/types'
import {
  createMemoryLogReporter, createStandardLog, DEFAULT_LOG_METHOD_NAMES, getLogger, Logger,
  logLevels, LogMethodNames, LogReporter, ReporterFilter,
  StandardLog, StandardLogForTest, StandardLogOptions
} from 'standard-log'
import { createColorLogReporter } from 'standard-log-color'
import { omit, Omit, requiredDeep, unpartial } from 'type-plus'

export {
  createConsoleLogReporter, createMemoryLogReporter, createStandardLogForTest,
  createTimestampFormatter, formatLogLevel, getLogger, InvalidId, logLevels,
  plainLogFormatter, StandardLogError, suppressLogs,
  toConsoleMethod, toLogLevel, toLogLevelName, toMessageWithLevel
} from 'standard-log'
export * from 'standard-log-color'
export type {
  ConsoleLogFormatter, ConsoleLogReporter, ConsoleLogReporterOptions,
  LogEntry, LogFilter, LogFormatter, LogFunction, Logger, LoggerOptions,
  LogLevel, LogMethod, LogMethodNames, LogReporter,
  LogReporterOptions, MemoryLogReporter, StandardLog, StandardLogOptions, TimestampFormat
} from 'standard-log'

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

export type LogContext<N extends string = LogMethodNames> = {
  log: StandardLog<N> & Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'>
}

export type LogOptions<N extends string = LogMethodNames> = StandardLogOptions<N>

export type TestLogContext<N extends string = LogMethodNames> = {
  log: StandardLogForTest<N> & Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'>
}

export type TestLogOptions<N extends string = LogMethodNames> = {
  log?: Partial<Omit<StandardLogOptions<N>, 'reporters'>>
}

export function createPrefixedGetLogger<
  N extends string = LogMethodNames
>(context: LogContext<N>, prefix: string): typeof getLogger<N> {
  return function getLogger(id, options) {
    return context.log.getLogger(`${prefix}:${id}`, options)
  }
}

export default <N extends string = LogMethodNames>(options?: LogOptions<N>) => ({
  name: '@just-web/log',
  init: (
    ctx: AppBaseContext
  ): [LogContext<N>] => {
    const sl = createStandardLog<N>(unpartial({ reporters: [createColorLogReporter()] }, options))
    sl.getLogger(`${ctx.name}:@just-web/log`).trace('init')

    const log = {
      ...sl,
      getLogger(id, options) { return sl.getLogger(`${ctx.name}:${id}`, options) },
    } as LogContext<N>['log']

    const appLogger = sl.getLogger(ctx.name)
    const logMethods = DEFAULT_LOG_METHOD_NAMES.concat(Object.keys(options?.customLevels ?? {})).concat(['on', 'count'])
    logMethods.forEach(m => (log as any)[m] = (appLogger as any)[m].bind(appLogger))
    return [{ log }]
  }
})

export const logPluginForTest = <N extends string = LogMethodNames>(options?: LogOptions<N>) => ({
  name: '@just-web/log',
  init: (
    ctx?: AppBaseContext & LogOptions<N>
  ): [TestLogContext<N>] => {
    const name = ctx?.name ?? 'test'
    const reporter = createMemoryLogReporter()
    const sl = createStandardLog<N>(requiredDeep<StandardLogOptions<N>>({
      logLevel: logLevels.debug,
      reporters: [reporter]
    }, options))

    sl.getLogger(`${name}:@just-web/log`).trace('initForTest')

    const log = {
      ...sl,
      getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) },
    } as TestLogContext<N>['log']

    const appLogger = sl.getLogger(name)
    const logMethods = DEFAULT_LOG_METHOD_NAMES.concat(Object.keys(options?.customLevels ?? {})).concat(['on'])
    logMethods.forEach(m => (log as any)[m] = (appLogger as any)[m].bind(appLogger))
    return [{ log: { ...log, reporter } }]
  }
})
