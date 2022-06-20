import type { CommandsContext } from '@just-web/commands'
import { CommandsContextOptions, createCommandsContext } from '@just-web/commands'
import type {
  ContributionsContext
} from '@just-web/contributions'
import { ContributionsContextOptions, createContributionsContext } from '@just-web/contributions'
import type { ErrorsContext } from '@just-web/errors'
import { createErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import type { LogContext, LogOptions, TestLogContext } from '@just-web/log'
import type { PlatformContext } from '@just-web/platform'
import { createPlatformContext } from '@just-web/platform'
import { ctx } from '../ctx'

export interface Context {
  appID: string,
  commands: CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  log: LogContext,
  platform: PlatformContext,
}

export interface TestContext {
  appID: string,
  commands: CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  log: TestLogContext,
  platform: PlatformContext,
}

export namespace createContext {
  export interface Options {
    log?: LogOptions,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  }
}

export function createContext({ log }: { log: LogContext }, options?: createContext.Options): Context {
  const contributions = createContributionsContext({ logContext: log }, options?.contributions)

  const commands = createCommandsContext({ contributions, logContext: log }, options?.commands)

  const context = {
    appID: ctx.genAppID(),
    log,
    commands,
    contributions,
    errors: createErrorsContext(options?.errors),
    platform: createPlatformContext()
  }

  return context
}
