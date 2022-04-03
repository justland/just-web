import { ReadonlyCommandRegistry, toReadonlyCommandRegistry } from '@just-web/commands'
import {
  ReadonlyCommandContributionRegistry,
  ReadonlyKeyBindingContributionRegistry
} from '@just-web/contributions'
import { ReadonlyErrorStore, toReadonlyErrorStore } from '@just-web/errors'
import { toReadonlyRegistry } from '@just-web/states'
import { Context } from './context'

export interface ReadonlyContext {
  commands: {
    registry: ReadonlyCommandRegistry
  },
  contributions: {
    commands: ReadonlyCommandContributionRegistry,
    keyBindings: ReadonlyKeyBindingContributionRegistry
  },
  errors: {
    store: ReadonlyErrorStore
  },
  platform: Context['platform']
}

export function toReadonlyContext(context: Context): ReadonlyContext {
  return {
    commands: {
      registry: toReadonlyCommandRegistry(context.commands.registry)
    },
    contributions: {
      commands: toReadonlyRegistry(context.contributions.commands),
      keyBindings: toReadonlyRegistry(context.contributions.keyBindings)
    },
    errors: {
      store: toReadonlyErrorStore(context.errors.store)
    },
    platform: context.platform
  }
}
