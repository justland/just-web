import {
	createMemoryLogReporter,
	createStandardLog, logLevels, type LogMethodNames, type StandardLogOptions
} from 'standard-log'
import { requiredDeep } from 'type-plus'
import { buildLogContext } from './log_plugin.shared.js'
import { LogOptions } from './log_plugin.types.js'
import { definePlugin } from './plugin.js'

export const logTestPlugin = definePlugin(<N extends string = LogMethodNames>(options?: LogOptions<N>) => ({
	name: '@just-web/test-log',
	async define(ctx) {
		const name = ctx?.name ?? 'test'
		const reporter = createMemoryLogReporter()

		const sl = createStandardLog<N>(
			requiredDeep<StandardLogOptions<N>>(
				{
					logLevel: logLevels.debug,
					reporters: [reporter]
				},
				options?.log
			)
		)
		return {
			log: Object.assign(buildLogContext<N>(name, sl, options), {
				reporter
			})
		}
	}
}))
