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

export namespace create {
  export interface Options {
    contributions: contributionsModule.ModuleOptions,
    commands: commandsModule.ModuleOptions,
    errors: errorsModule.ModuleOptions
  }
}

let readonlyContext: ReadonlyContext

export function create(options?: create.Options): Context {
  log.trace('createContext()')
  const contributions = contributionsModule.create(options?.contributions)
  const commands = commandsModule.create({
    ...options?.commands,
    contributions
  })

  const context = {
    commands,
    contributions,
    errors: errorsModule.create(options?.errors),
    platform: platformModule.create({ contributions, commands }),
    states: statesModule
  }

  readonlyContext = toReadonly(context)

  return context
}

function toReadonly(context: Context): ReadonlyContext {
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
