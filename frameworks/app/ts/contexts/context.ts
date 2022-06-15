import * as commandsModule from '@just-web/commands'
import { CommandsContextOptions } from '@just-web/commands'
import {
  ContributionsContext, ContributionsContextOptions, createContributionsContext,
  ReadonlyContributionsContext
} from '@just-web/contributions'
import { createErrorsContext, ErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import { LogContext, LogOptions } from '@just-web/log'
import * as platformModule from '@just-web/platform'

export interface Context {
  commands: commandsModule.CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  log: LogContext,
  platform: platformModule.PlatformContext,
}

export interface ReadonlyContext {
  commands: commandsModule.ReadonlyCommandsContext,
  contributions: ReadonlyContributionsContext,
  errors: ErrorsContext,
  log: LogContext,
  platform: platformModule.ReadonlyPlatformContext,
}

export namespace createContext {
  export interface Options {
    log?: LogOptions,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  }
}

export function createContext({ logContext }: { logContext: LogContext }, options?: createContext.Options): Context {
  const log = logContext.getLogger('@just-web/app')
  log.trace('create context')

  const contributions = createContributionsContext({ logContext }, options?.contributions)

  const commands = commandsModule.createCommandsContext({ contributions, logContext }, options?.commands)

  const context = {
    log: logContext,
    commands,
    contributions,
    errors: createErrorsContext(options?.errors),
    platform: platformModule.createPlatformContext()
  }

  return context
}

// function toReadonly(context: Context): ReadonlyContext {
//   return {
//     logContext: context.logContext,
//     commands: commandsModule.toReadonlyCommandsContext(context.commands),
//     contributions: toReadonlyContributionsContext(context.contributions),
//     errors: context.errors,
//     platform: platformModule.toReadonlyContext(context.platform),
//   }
// }
