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
  platform: platformModule.Module,
  states: typeof statesModule
}

export interface ReadonlyContext {
  commands: commandsModule.ReadonlyModule,
  contributions: contributionsModule.ReadonlyModule,
  errors: errorsModule.ReadonlyModule,
  platform: platformModule.ReadonlyModule,
  states: Context['states']
}

export namespace createContext {
  export interface Options {
    contributions: contributionsModule.ModuleOptions,
    commands: commandsModule.ModuleOptions,
    errors: errorsModule.ModuleOptions
  }
}

let readonlyContext: ReadonlyContext

export function createContext(options?: createContext.Options): Context {
  log.trace('createContext()')
  const contributions = contributionsModule.start(options?.contributions)
  const commands = commandsModule.start({
    ...options?.commands,
    contributions
  })

  const context = {
    commands,
    contributions,
    errors: errorsModule.start(options?.errors),
    platform: platformModule.start({ contributions, commands }),
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
    platform: platformModule.toReadonly(context.platform),
    states: context.states
  }
}

export function getReadonlyContext() {
  if (!readonlyContext) log.warn(`getReadonlyContext() cannot be called during load time.`)
  return readonlyContext
}
