import { CommandContributionRegistry } from '@just-web/contributions'
import { createRegistry } from '@just-web/states'
import produce from 'immer'
import { pick } from 'type-plus'
import { log } from './log'
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
    commands: Record<string, CommandHandler>,
    contributions: {
      commands: CommandContributionRegistry
    }
  }
}

export function commandRegistry(options: commandRegistry.Options) {
  const { contributions } = options

  const registry = createRegistry<() => void, string>(options.commands)

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
      registry.set(produce(commands, m => { m[command] = handler }))
    },
    invoke(command: string) {
      log.trace('invoke', command)
      const handler = registry.get()[command]
      handler ? handler() : log.error(`Invoking not registered command: '${command}'`)
    },
    keys: registry.keys.bind(registry)
  }
}

export function toReadonlyCommandRegistry(s: CommandRegistry): ReadonlyCommandRegistry {
  return pick(s, 'invoke', 'keys')
}
