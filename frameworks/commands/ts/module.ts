import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface Module {
  registry: CommandRegistry
}

export interface ReadonlyModule {
  registry: ReadonlyCommandRegistry
}
export interface ModuleOptions extends commandRegistry.Options { }

export function create(options: ModuleOptions): Module {
  options.contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  options.contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return { registry: commandRegistry(options) }
}

export function toReadonly(module: Module): ReadonlyModule {
  return {
    registry: toReadonlyCommandRegistry(module.registry)
  }
}
