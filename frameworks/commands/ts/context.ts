import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface CommandsContext extends CommandRegistry {
}

export interface ReadonlyCommandsContext extends ReadonlyCommandRegistry {
}

export interface CommandsContextOptions extends commandRegistry.Options { }
export namespace createCommandsContext {
  export interface Context {
    logContext: LogContext,
    contributions: ContributionsContext
  }
}

export function createCommandsContext(
  { contributions, logContext }: createCommandsContext.Context,
  options?: CommandsContextOptions
): CommandsContext {
  const log = logContext.getLogger('@just-web/commands')
  log.trace('create context')
  contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return { ...commandRegistry({ contributions, logContext }, options) }
}

export function toReadonlyCommandsContext(module: CommandsContext): ReadonlyCommandsContext {
  return {
    ...module,
    ...toReadonlyCommandRegistry(module)
  }
}
