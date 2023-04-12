import { define } from '@unional/gizmo'
import {
	StandardLogOptions,
	createMemoryLogReporter,
	createStandardLog,
	logLevels,
	type LogMethodNames
} from 'standard-log'
import { requiredDeep } from 'type-plus'
import { appGizmo, type AppGizmo } from './app_gizmo.js'
import { buildLogContext } from './log_gizmo.logic.js'
import type { LogGizmoOptions } from './log_gizmo.types.js'

export const logTestGizmo = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(appGizmo),
	async create(ctx: AppGizmo) {
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
			log: Object.assign(buildLogContext<N>(ctx.name, sl, options), {
				reporter
			})
		}
	}
}))

export type LogTestGizmo<N extends string = LogMethodNames> = define.Infer<typeof logTestGizmo<N>>
