import { toReadonlyRegistry } from '@just-web/states'
import { CommandContributionRegistry, commandContributionRegistry, ReadonlyCommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry, keyBindingRegistry, ReadonlyKeyBindingContributionRegistry } from './keyBindings'

export interface Module {
  commands: CommandContributionRegistry,
  keyBindings: KeyBindingContributionRegistry
}

export interface ReadonlyModule {
  commands: ReadonlyCommandContributionRegistry,
  keyBindings: ReadonlyKeyBindingContributionRegistry
}

export interface ModuleOptions {
  commands: commandContributionRegistry.Options['commands'],
  keyBindings: keyBindingRegistry.Options['keyBindings']
}

// eslint-disable-next-line @typescript-eslint/require-await
export function start(options?: ModuleOptions): Module {
  const commands = commandContributionRegistry(options)
  const keyBindings = keyBindingRegistry(options)

  return { commands, keyBindings }
}

export function toReadonly(module: Module): ReadonlyModule {
  return {
    commands: toReadonlyRegistry(module.commands),
    keyBindings: toReadonlyRegistry(module.keyBindings)
  }
}
