import { define } from '@unional/gizmo'
import { createStandardLogForTest, type StandardLogForTestOptions } from 'standard-log/testing'
import { type IdGizmo, idGizmoFn } from '../../id/src/id_gizmo.js'
import { buildLogContext } from './log_gizmo.logic.js'
import type { GizmoStandardLog } from './log_gizmo.types.js'
import type { LogMethodNames, MemoryLogReporter } from './standard_log.js'

export type LogTestGizmoOptions<N extends string = LogMethodNames> = StandardLogForTestOptions<N>

/**
 * A gizmo function that creates a log gizmo for testing.
 *
 * It defaults log level to `debug` and exposes a memory reporter for log inspection.
 *
 * @require `IDGizmo`
 *
 * It is part of `justTestApp` and you normally don't need to create it directly.
 *
 * @example
 * ```ts
 * const app = await justTestApp().create()
 * app.log.info('hello world')
 * app.log.reporter.getLogMessagesWithLevel() // `(INFO) hello world`
 * ```
 */
export const logTestGizmoFn = define(<N extends string = LogMethodNames>(options?: LogTestGizmoOptions<N>) => ({
	static: define.require(idGizmoFn),
	async create(ctx: IdGizmo) {
		const sl = createStandardLogForTest<N>(options)
		return {
			log: Object.assign(buildLogContext<N>(ctx.name, sl, options), {
				reporter: sl.reporter
			}) as unknown as GizmoStandardLog<N> & {
				reporter: MemoryLogReporter
			}
		}
	}
}))

/**
 * A test gizmo with log.
 *
 * It defaults log level to `debug` and exposes a memory reporter for log inspection.
 */
export type LogTestGizmo<N extends string = LogMethodNames> = {
	log: GizmoStandardLog<N> & {
		reporter: MemoryLogReporter
	}
}
