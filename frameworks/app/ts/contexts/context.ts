import { BrowserContext, BrowserOptions, createErrorsContext } from '@just-web/browser'
import type { CommandsContext } from '@just-web/commands'
import { CommandsOptions, createCommandsContext } from '@just-web/commands'
import type {
  ContributionsContext,
  ContributionsOptions
} from '@just-web/contributions'
import { createContributionsContext } from '@just-web/contributions'
import type { LogContext, LogOptions, TestLogContext } from '@just-web/log'
import { createOSContext, OSContext } from '@just-web/os'
import { LeftJoin } from 'type-plus'
import { ctx } from '../createApp.ctx'

export type Context = {
  appID: string,
} & LogContext & ContributionsContext & CommandsContext & BrowserContext & OSContext

export type TestContext = LeftJoin<Context, TestLogContext>

export namespace createContext {
  export type Options = BrowserOptions & LogOptions & CommandsOptions & ContributionsOptions
}

export function createContext({ log }: LogContext, options?: createContext.Options): Context {
  const contributions = createContributionsContext({ log }, options)

  const commands = createCommandsContext({ ...contributions, log, options })
  const os = createOSContext()

  const context = {
    appID: ctx.genAppID(),
    log,
    ...commands,
    ...contributions,
    ...os,
    ...createErrorsContext({ options })
  }

  return context
}
