import { commandRegistry, CommandRegistry } from '@just-web/commands'
import * as platform from '@just-web/platform'
import {
  commandContributionRegistry,
  CommandContributionRegistry,
  KeyBindingContributionRegistry,
  keyBindingRegistry
} from '@just-web/contributions'
import { createErrorStore, ErrorStore } from '@just-web/errors'
import { record } from 'type-plus'

export interface Context {
  commands: {
    registry: CommandRegistry
  },
  contributions: {
    commands: CommandContributionRegistry,
    keyBindings: KeyBindingContributionRegistry
  },
  errors: {
    store: ErrorStore
  },
  platform: typeof platform
}

export namespace createContext {
  export interface Options {
    contributions: {
      commands: commandContributionRegistry.Options['commands'],
      keyBindings: keyBindingRegistry.Options['keyBindings']
    },
    commands: commandRegistry.Options['commands']
  }
}

export function createContext(options?: createContext.Options): Context {

  const errors: Context['errors'] = {
    store: createErrorStore()
  }
  const contributions: Context['contributions'] = {
    commands: commandContributionRegistry(options?.contributions ?? {
      commands: record()
    }),
    keyBindings: keyBindingRegistry(options?.contributions ?? {
      keyBindings: record()
    })
  }
  const commands: Context['commands'] = {
    registry: commandRegistry({
      commands: options?.commands ?? record(),
      contributions
    })
  }

  return {
    commands,
    contributions,
    errors,
    platform
  }
}
