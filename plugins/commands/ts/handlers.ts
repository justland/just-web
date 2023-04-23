import { logLevels, type LogGizmo } from '@just-web/app'
import { createRegistry } from '@just-web/states'
import { tersify } from 'tersify'
import type { AnyFunction } from 'type-plus'
import type { HandlerRegistry } from './types.js'

export namespace handlerRegistry {
	export type Options = Record<string, AnyFunction>
}

export function handlerRegistry({ log }: LogGizmo, options?: handlerRegistry.Options): HandlerRegistry {
	const logger = log.getLogger('@just-web/commands')

	const registry = createRegistry<string, (...args: any[]) => void>(options)

	return {
		/**
		 * register handler for specified command.
		 */
		register(id: string, handler: AnyFunction) {
			logger.trace('register', id)
			const commands = registry.get()
			if (commands[id]) {
				logger.notice(`Registering a new handler for '${id}'. Please make sure this is expected.`)
				logger.on(logLevels.debug, log => log(`overrideing handler: ${tersify(handler)}`))
			}
			registry.set(m => {
				m[id] = handler
			})
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
