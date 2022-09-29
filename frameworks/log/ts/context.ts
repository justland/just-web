import { defineActivate } from '@just-web/types'
import {
  createMemoryLogReporter, createStandardLog, logLevels, LogMethodNames, MemoryLogReporter, StandardLog, StandardLogOptions
} from 'standard-log'
import { requiredDeep } from 'type-plus'

export interface LogContext<N extends string = LogMethodNames> extends StandardLog<N> {
}

export type LogOptions<N extends string = LogMethodNames> = {
  log?: StandardLogOptions<N>
}

export const activate = defineActivate(async <N extends string = LogMethodNames>(
  { name, options }: { name: string, options?: LogOptions<N> }
): Promise<[LogContext<N>]> => {
  const sl = createStandardLog<N>(options?.log)
  const log = sl.getLogger(`${name}:@just-web/log`)
  log.trace('create log context')
  return [{
    ...sl,
    getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) }
  }]
})

export function createLogContext<N extends string = LogMethodNames>(
  { name, options }: { name: string, options?: LogOptions<N> },
): LogContext<N> {
  const sl = createStandardLog<N>(options?.log)
  const log = sl.getLogger(`${name}:@just-web/log`)
  log.trace('create log context')
  return {
    ...sl,
    getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) }
  }
}

export interface TestLogContext<N extends string = LogMethodNames> extends LogContext<N> {
  reporter: MemoryLogReporter
}

export interface TestLogOptions<N extends string = LogMethodNames> extends Partial<Omit<StandardLogOptions<N>, 'reporters'>> { }

export function createTestLogContext<N extends string = LogMethodNames>(ctx?: { name?: string }, options?: TestLogOptions<N>): TestLogContext<N> {
  const name = ctx?.name ?? 'test'
  const reporter = createMemoryLogReporter()
  const sl = createStandardLog<N>(requiredDeep<StandardLogOptions<N>>({
    logLevel: logLevels.debug,
    reporters: [reporter]
  }, options))

  const log = sl.getLogger(`${name}:@just-web/log`)
  log.trace('create test log context')
  return {
    ...sl,
    getLogger(id, options) { return sl.getLogger(`${name}:${id}`, options) },
    reporter
  }
}
