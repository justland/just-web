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
import { ctx } from '../app.ctx'

export type Context = {
  appID: string,
  commands: CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  platform: PlatformContext,
} & LogContext

export type TestContext = {
  appID: string,
  commands: CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  platform: PlatformContext,
} & TestLogContext

export namespace createContext {
  export type Options = {
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  } & LogOptions
}

export function createContext({ log }: LogContext, options?: createContext.Options): Context {
  const contributions = createContributionsContext({ log }, options?.contributions)

  const commands = createCommandsContext({ contributions, log }, options?.commands)

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
