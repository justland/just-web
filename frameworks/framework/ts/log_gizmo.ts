import { define } from '@unional/gizmo'
import { createStandardLog, type LogMethodNames } from 'standard-log'
import { appGizmo, type AppGizmo } from './app_gizmo.js'
import { buildLogContext } from './log_gizmo.logic.js'
import type { LogGizmoOptions } from './log_gizmo.types.js'

export const logGizmo = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(appGizmo),
	async create(ctx: AppGizmo) {
		const sl = createStandardLog<N>(options)
		return {
			log: buildLogContext<N>(ctx.name, sl, options)
		}
	}
}))

export type LogGizmo<N extends string = LogMethodNames> = define.Infer<typeof logGizmo<N>>
