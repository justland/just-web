import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface CommandsContext extends CommandRegistry {
}

export interface ReadonlyCommandsContext extends ReadonlyCommandRegistry {
}

export interface CommandsContextOptions extends commandRegistry.Options { }

export function createCommandsContext(options: CommandsContextOptions): CommandsContext {
  options.contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  options.contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return { ...commandRegistry(options) }
}

export function toReadonlyCommandsContext(module: CommandsContext): ReadonlyCommandsContext {
  return {
    ...module,
    ...toReadonlyCommandRegistry(module)
  }
}
