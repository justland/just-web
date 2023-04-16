import { idGizmoFn, type IdGizmo } from '@just-web/id'
import { define } from '@unional/gizmo'
import type { LogMethodNames, MemoryLogReporter } from './standard_log.js'
import { createStandardLogForTest } from 'standard-log/testing'
import { buildLogContext } from './log_gizmo.logic.js'
import type { GizmoStandardLog, LogGizmoOptions } from './log_gizmo.types.js'

export type TestGizmoStandardLog<N extends string = LogMethodNames> = GizmoStandardLog<N> & {
	reporter: MemoryLogReporter
}

export const logTestGizmoFn = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(idGizmoFn),
	async create(ctx: IdGizmo) {
		const sl = createStandardLogForTest<N>(options)
		return {
			log: Object.assign(buildLogContext<N>(ctx.name, sl, options), {
				reporter: sl.reporter
			}) as unknown as TestGizmoStandardLog<N>
		}
	}
}))

export type LogTestGizmo<N extends string = LogMethodNames> = {
	log: TestGizmoStandardLog<N>
}
