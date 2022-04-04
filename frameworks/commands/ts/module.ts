import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry } from './commandRegistry'

export interface Module {
  registry: CommandRegistry
}

export interface ReadonlyModule {
  registry: ReadonlyCommandRegistry
}
export interface ModuleOptions extends commandRegistry.Options { }

export function start(options: ModuleOptions): Module {
  return { registry: commandRegistry(options) }
}
