import * as commandsModule from '@just-web/commands'
import * as contributionsModule from '@just-web/contributions'
import * as errorsModule from '@just-web/errors'
import * as platformModule from '@just-web/platform'
import * as statesModule from '@just-web/states'
import { log } from './log'

export interface Context {
  commands: commandsModule.Module,
  contributions: contributionsModule.Module,
  errors: errorsModule.Module,
  platform: typeof platformModule,
  states: typeof statesModule
}

export interface ReadonlyContext {
  commands: commandsModule.ReadonlyModule,
  contributions: contributionsModule.ReadonlyModule,
  errors: errorsModule.ReadonlyModule,
  platform: Context['platform'],
  states: Context['states']
}

let readonlyContext: ReadonlyContext

export namespace createContext {
  export interface Options {
    contributions: contributionsModule.ModuleOptions,
    commands: commandsModule.ModuleOptions,
    errors: errorsModule.ModuleOptions
  }
}

export function createContext(options?: createContext.Options): Context {
  log.notice('createContext()')
  const contributions: Context['contributions'] = contributionsModule.start(options?.contributions)

  const context = {
    commands: commandsModule.start({
      ...options?.commands,
      contributions
    }),
    contributions,
    errors: errorsModule.start(options?.errors),
    platform: platformModule,
    states: statesModule
  }

  readonlyContext = toReadonlyContext(context)

  return context
}

function toReadonlyContext(context: Context): ReadonlyContext {
  return {
    commands: commandsModule.toReadonly(context.commands),
    contributions: contributionsModule.toReadonly(context.contributions),
    errors: errorsModule.toReadonly(context.errors),
    platform: context.platform,
    states: context.states
  }
}

export function getReadonlyContext() {
  if (!readonlyContext) log.warn(`getReadonlyContext() cannot be called during load time.`)
  return readonlyContext
}
