import {
  captureLogs, config, ConfigOptions, createMemoryLogReporter,
  logLevels, MemoryLogReporter
} from 'standard-log'
import { requiredDeep } from 'type-plus'
import { log } from './log'

export interface LogOptions extends Partial<ConfigOptions> { }

export function createLogContext(options?: LogOptions) {
  config(options)

  log.trace('create log context')
}

export interface TestLogContext {
  log: {
    captureLogs: typeof captureLogs,
    reporter: MemoryLogReporter
  }
}

export interface TestLogOptions extends Partial<Omit<ConfigOptions, 'reporters'>> { }

export function createTestLogContext(options?: TestLogOptions): TestLogContext {
  const reporter = createMemoryLogReporter()
  config(requiredDeep({
    mode: 'test',
    logLevel: logLevels.debug,
    reporters: [reporter]
  }, options))

  log.trace('create test log context')
  return {
    log: {
      captureLogs,
      reporter
    }
  }
}
