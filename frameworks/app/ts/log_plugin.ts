import { createStandardLog, type LogMethodNames } from 'standard-log'
import { buildLogContext } from './log_plugin.shared.js'
import type { LogOptions } from './log_plugin.types.js'
import { definePlugin } from './plugin.js'

export const logPlugin = definePlugin(<N extends string = LogMethodNames>(options?: LogOptions<N>) => ({
	name: '@just-web/log',
	async define(ctx) {
		const sl = createStandardLog<N>(options?.log)
		return {
			log: buildLogContext<N>(ctx.name, sl, options)
		}
	}
}))
