import { define } from '@unional/gizmo'
import { type LogMethodNames } from 'standard-log'
import { createStandardLogForTest } from 'standard-log/testing'

import { appGizmo, type AppGizmo } from './app_gizmo.js'
import { buildLogContext } from './log_gizmo.logic.js'
import type { LogGizmoOptions } from './log_gizmo.types.js'

export const logTestGizmo = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(appGizmo),
	async create(ctx: AppGizmo) {
		const sl = createStandardLogForTest<N>(options)
		return {
			log: Object.assign(buildLogContext<N>(ctx.name, sl, options), {
				reporter: sl.reporter
			})
		}
	}
}))

export type LogTestGizmo<N extends string = LogMethodNames> = define.Infer<typeof logTestGizmo<N>>
