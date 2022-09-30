import type { CommandsContext } from '@just-web/commands'
import { CommandsOptions, createCommandsContext } from '@just-web/commands'
import type {
  ContributionsContext,
  ContributionsOptions
} from '@just-web/contributions'
import { createContributionsContext } from '@just-web/contributions'
import type { ErrorsContext } from '@just-web/errors'
import { createErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import type { LogContext, LogOptions, TestLogContext } from '@just-web/log'
import type { PlatformContext } from '@just-web/platform'
import { createPlatformContext } from '@just-web/platform'
import { LeftJoin } from 'type-plus'
import { ctx } from '../app.ctx'

export type Context = {
  appID: string,
  platform: PlatformContext,
} & LogContext & ContributionsContext & CommandsContext & ErrorsContext

export type TestContext = LeftJoin<Context, TestLogContext>

export namespace createContext {
  export type Options = {
    errors?: ErrorsContextOptions,
  } & LogOptions & CommandsOptions & ContributionsOptions
}

export function createContext({ log }: LogContext, options?: createContext.Options): Context {
  const contributions = createContributionsContext({ log }, options)

  const commands = createCommandsContext({ ...contributions, log, options })

  const context = {
    appID: ctx.genAppID(),
    log,
    ...commands,
    ...contributions,
    ...createErrorsContext(options?.errors),
    platform: createPlatformContext()
  }

  return context
}
