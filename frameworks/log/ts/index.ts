import { StackTraceMeta } from '@just-func/types'
import { defineInitialize, defineInitializeForTest } from '@just-web/types'
import {
  createMemoryLogReporter, createStandardLog, Logger,
  logLevels, LogMethodNames, LogReporter, MemoryLogReporter,
  ReporterFilter, StandardLog, StandardLogOptions
} from 'standard-log'
import { omit, requiredDeep } from 'type-plus'

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
  log: StandardLog<N>
}

export type LogOptions<N extends string = LogMethodNames> = {
  log?: StandardLogOptions<N>
}

export type TestLogContext<N extends string = LogMethodNames> = LogContext<N> & {
  log: { reporter: MemoryLogReporter }
}

export type TestLogOptions<N extends string = LogMethodNames> = {
  log?: Partial<Omit<StandardLogOptions<N>, 'reporters'>>
}

export default {
  name: '@just-web/log',
  init: defineInitialize(<N extends string = LogMethodNames>(
    { name, options }: { name: string, options?: LogOptions<N> }
  ): [LogContext<N>] => {
    const sl = createStandardLog<N>(options?.log)
    const log = sl.getLogger(`${name}:@just-web/log`)
    log.trace('create log context')
    return [{
      log: {
        ...sl,
        getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) }
      }
    }]
  }),
  initForTest: defineInitializeForTest(<N extends string = LogMethodNames>(
    ctx?: { name: string, options?: LogOptions<N> }
  ): [TestLogContext<N>] => {
    const name = ctx?.name ?? 'test'
    const reporter = createMemoryLogReporter()
    const sl = createStandardLog<N>(requiredDeep<StandardLogOptions<N>>({
      logLevel: logLevels.debug,
      reporters: [reporter]
    }, ctx?.options?.log))

    const log = sl.getLogger(`${name}:@just-web/log`)
    log.trace('create test log context')
    return [{
      log: {
        ...sl,
        getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) },
        reporter
      }
    }]
  })
}

export function createLogContext<N extends string = LogMethodNames>(
  { name, options }: { name: string, options?: LogOptions<N> },
): LogContext<N> {
  const sl = createStandardLog<N>(options?.log)
  const log = sl.getLogger(`${name}:@just-web/log`)
  log.trace('create log context')
  return {
    log: {
      ...sl,
      getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) }
    }
  }
}

export function createTestLogContext<
  N extends string = LogMethodNames
>(ctx?: { name?: string }, options?: TestLogOptions<N>): TestLogContext<N> {
  const name = ctx?.name ?? 'test'
  const reporter = createMemoryLogReporter()
  const sl = createStandardLog<N>(requiredDeep<StandardLogOptions<N>>({
    logLevel: logLevels.debug,
    reporters: [reporter]
  }, options?.log))

  const log = sl.getLogger(`${name}:@just-web/log`)
  log.trace('create test log context')
  return {
    log: {
      ...sl,
      getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) },
      reporter
    }
  }
}
