import { idGizmo, type IdGizmo } from '@just-web/id'
import { define } from '@unional/gizmo'
import { createStandardLog, type LogMethodNames } from 'standard-log'
import { buildLogContext } from './log_gizmo.logic.js'
import type { LogGizmoOptions } from './log_gizmo.types.js'

export const logGizmo = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(idGizmo),
	async create(ctx: IdGizmo) {
		const sl = createStandardLog<N>(options)
		return {
			log: buildLogContext<N>(ctx.name, sl, options)
		}
	}
}))

export type LogGizmo<N extends string = LogMethodNames> = define.Infer<typeof logGizmo<N>>
