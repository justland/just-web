import * as commandsModule from '@just-web/commands'
import { ContributionsContext, ContributionsContextOptions, createContributionsContext, ReadonlyContributionsContext, toReadonlyContributionsContext } from '@just-web/contributions'
import { createErrorsContext, ErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import * as platformModule from '@just-web/platform'
import { log } from '../log'

export interface Context {
  commands: commandsModule.CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  platform: platformModule.PlatformContext,
}

export interface ReadonlyContext {
  commands: commandsModule.ReadonlyCommandsContext,
  contributions: ReadonlyContributionsContext,
  errors: ErrorsContext,
  platform: platformModule.ReadonlyPlatformContext,
}

export namespace createContext {
  export interface Options {
    contributions: ContributionsContextOptions,
    commands: commandsModule.CommandsContextOptions,
    errors: ErrorsContextOptions
  }
}

let readonlyContext: ReadonlyContext

export function createContext(options?: createContext.Options): Context {
  log.trace('createContext()')
  const contributions = createContributionsContext(options?.contributions)
  const commands = commandsModule.createCommandsContext({
    ...options?.commands,
    contributions
  })

  const context = {
    commands,
    contributions,
    errors: createErrorsContext(options?.errors),
    platform: platformModule.createContext()
  }

  readonlyContext = toReadonly(context)

  return context
}

function toReadonly(context: Context): ReadonlyContext {
  return {
    commands: commandsModule.toReadonlyCommandsContext(context.commands),
    contributions: toReadonlyContributionsContext(context.contributions),
    errors: context.errors,
    platform: platformModule.toReadonlyContext(context.platform),
  }
}

/**
 * @deprecated to be removed
 */
export function getReadonlyContext() {
  if (!readonlyContext) log.warn(`getReadonlyContext() cannot be called during load time.`)
  return readonlyContext
}
