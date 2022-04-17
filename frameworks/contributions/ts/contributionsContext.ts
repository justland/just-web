import { toReadonlyRegistry } from '@just-web/states'
import { CommandContributionRegistry, commandContributionRegistry, ReadonlyCommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry, keyBindingRegistry, ReadonlyKeyBindingContributionRegistry } from './keyBindings'

export interface ContributionsContext {
  commands: CommandContributionRegistry,
  keyBindings: KeyBindingContributionRegistry
}

export interface ReadonlyContributionsContext {
  commands: ReadonlyCommandContributionRegistry,
  keyBindings: ReadonlyKeyBindingContributionRegistry
}

export interface ContributionsContextOptions {
  commands?: commandContributionRegistry.Options['commands'],
  keyBindings?: keyBindingRegistry.Options['keyBindings']
}

export function createContributionsContext(options?: ContributionsContextOptions): ContributionsContext {
  const commands = commandContributionRegistry(options)
  const keyBindings = keyBindingRegistry(options)

  return { commands, keyBindings }
}

export function toReadonlyContributionsContext(module: ContributionsContext): ReadonlyContributionsContext {
  return {
    commands: toReadonlyRegistry(module.commands),
    keyBindings: toReadonlyRegistry(module.keyBindings)
  }
}
