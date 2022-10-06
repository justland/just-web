import type { LogContext } from '@just-web/log'
import { createRegistry } from '@just-web/states'
import type { AnyFunction } from 'type-plus'

export type CommandRegistry = {
  /**
   * register handler for the specified command.
   */
  register(command: string, handler: AnyFunction): void,
  /**
   * invoke a registered command.
   * @param args arguments for the command
   */
  invoke(command: string, ...args: any[]): any,
  /**
   * Gets all registered command names.
   */
  keys(): string[]
}

export namespace commandRegistry {
  export type Options = Record<string, AnyFunction>
}

export function commandRegistry(
  { log }: LogContext,
  options?: commandRegistry.Options): CommandRegistry {
  const logger = log.getLogger('@just-web/commands')

  const registry = createRegistry<string, (...args: any[]) => void>(options)

  return {
    /**
     * register handler for specified command.
     */
    register(command: string, handler: AnyFunction) {
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
      return handler ? handler(...args) : logger.error(`Invoking not registered command: '${command}'`)
    },
    keys: registry.keys.bind(registry)
  }
}
