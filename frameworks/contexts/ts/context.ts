import * as commandsModule from '@just-web/commands'
import { ContributionsContext, ContributionsContextOptions, createContributionsContext, ReadonlyContributionsContext, toReadonlyContributionsContext } from '@just-web/contributions'
import { createErrorsContext, ErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import * as platformModule from '@just-web/platform'
import * as statesModule from '@just-web/states'
import { log } from './log'

export type { Adder, OnStateChange, ReadonlyRegistry, ReadonlyStore, Registry, ResetState, SetState, StateChangeHandler, Store, WithAdder } from '@just-web/states'

export interface Context {
  commands: commandsModule.CommandsContext,
  contributions: ContributionsContext,
  errors: ErrorsContext,
  platform: platformModule.PlatformContext,
  states: typeof statesModule
}

export interface ReadonlyContext {
  commands: commandsModule.ReadonlyCommandsContext,
  contributions: ReadonlyContributionsContext,
  errors: ErrorsContext,
  platform: platformModule.ReadonlyPlatformContext,
  states: Context['states']
}

export namespace create {
  export interface Options {
    contributions: ContributionsContextOptions,
    commands: commandsModule.CommandsContextOptions,
    errors: ErrorsContextOptions
  }
}

let readonlyContext: ReadonlyContext

export function create(options?: create.Options): Context {
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
    platform: platformModule.createContext(),
    states: statesModule
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
    states: context.states
  }
}

export function getReadonlyContext() {
  if (!readonlyContext) log.warn(`getReadonlyContext() cannot be called during load time.`)
  return readonlyContext
}
