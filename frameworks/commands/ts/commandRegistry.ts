import { LogContext } from '@just-web/log'
import { createRegistry } from '@just-web/states'
import { CommandHandler } from './types'

export interface CommandRegistry {
  /**
   * register handler for specified command.
   */
  register(command: string, handler: CommandHandler): void,
  invoke(command: string, ...args: any[]): void,
  keys(): string[]
}

export namespace commandRegistry {
  export type Options = Record<string, CommandHandler>
  export type Context = LogContext
}

export function commandRegistry(
  { log }: commandRegistry.Context,
  options?: commandRegistry.Options): CommandRegistry {
  const logger = log.getLogger('@just-web/commands')

  const registry = createRegistry<string, (...args: any[]) => void>(options)

  return {
    /**
     * register handler for specified command.
     */
    register(command: string, handler: CommandHandler) {
      logger.trace('register', command)

      const commands = registry.get()
      if (commands[command]) {
        logger.warn(`Registering a duplicate command, ignored: ${command}`)
        return
      }
      registry.update(m => { m[command] = handler })
    },
    invoke(command: string, ...args: any[]) {
      logger.trace('invoke', command)
      const handler = registry.get()[command]
      handler ? handler(...args) : logger.error(`Invoking not registered command: '${command}'`)
    },
    keys: registry.keys.bind(registry)
  }
}
