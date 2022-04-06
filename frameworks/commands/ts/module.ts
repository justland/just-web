import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface Module {
  registry: CommandRegistry
}

export interface ReadonlyModule {
  registry: ReadonlyCommandRegistry
}
export interface ModuleOptions extends commandRegistry.Options { }

export function create(options: ModuleOptions): Module {
  return { registry: commandRegistry(options) }
}

export function toReadonly(module: Module): ReadonlyModule {
  return {
    registry: toReadonlyCommandRegistry(module.registry)
  }
}
