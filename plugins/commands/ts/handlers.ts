import { LogContext, logLevels } from '@just-web/log'
import { createRegistry } from '@just-web/states'
import { tersify } from 'tersify'
import type { AnyFunction } from 'type-plus'
import type { CommandHandler, HandlerRegistry } from './types'

export namespace handlerRegistry {
  export type Options = Record<string, AnyFunction>
}

export function handlerRegistry(
  { log }: LogContext,
  options?: handlerRegistry.Options): HandlerRegistry {
  const logger = log.getLogger('@just-web/commands')

  const registry = createRegistry<string, (...args: any[]) => void>(options)

  return {
    /**
     * register handler for specified command.
     */
    register(command: string | CommandHandler, handler?: AnyFunction) {
      const [id, hdr] = typeof command === 'string'
        ? [command, handler!]
        : [command.id, command.handler]
      logger.trace('register', id)
      const commands = registry.get()
      if (commands[id]) {
        logger.notice(`Registring a new handler for '${id}'. Please make sure this is expected.`)
        logger.on(logLevels.debug, log => log(`overrideing handler: ${tersify(hdr)}`))
      }
      registry.update(m => { m[id] = hdr })
    },
    invoke(id: string, ...args: any[]) {
      logger.trace('invoke', id)
      const handler = registry.get()[id]
      return handler ? handler(...args) : logger.error(`Invoking not registered command: '${id}'`)
    },
    keys: registry.keys.bind(registry),
    has: registry.has.bind(registry)
  }
}
