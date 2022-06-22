import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { createRegistry } from '@just-web/states'
import { pick } from 'type-plus'
import { CommandHandler } from './types'

export interface ReadonlyCommandRegistry {
  invoke(command: string): void,
  keys(): string[]
}

export interface CommandRegistry extends ReadonlyCommandRegistry {
  /**
   * register handler for specified command.
   */
  register(command: string, handler: CommandHandler): void
}

export namespace commandRegistry {
  export interface Options {
    commands?: Record<string, CommandHandler>,
    // contributions: {
    //   commands: CommandContributionRegistry,
    //   keyBindings: KeyBindingContributionRegistry
    // }
  }
  export interface Context {
    logContext: LogContext,
    contributions: ContributionsContext
  }
}

export function commandRegistry(
  { contributions, logContext }: commandRegistry.Context,
  options?: commandRegistry.Options) {
  const log = logContext.getLogger('@just-web/commands')

  const registry = createRegistry<string, (...args: any[]) => void>(options?.commands)

  return {
    /**
     * register handler for specified command.
     */
    register(command: string, handler: CommandHandler) {
      log.trace('register', command)

      if (!contributions.commands.keys().includes(command))
        return log.error(`Registering an unknown command: ${command}`)

      const commands = registry.get()
      if (commands[command]) {
        log.warn(`Registering a duplicate command, ignored: ${command}`)
        return
      }
      registry.update(m => { m[command] = handler })
    },
    invoke(command: string, ...args: any[]) {
      log.trace('invoke', command)
      const handler = registry.get()[command]
      handler ? handler(...args) : log.error(`Invoking not registered command: '${command}'`)
    },
    keys: registry.keys.bind(registry)
  }
}

export function toReadonlyCommandRegistry(s: CommandRegistry): ReadonlyCommandRegistry {
  return pick(s, 'invoke', 'keys')
}
