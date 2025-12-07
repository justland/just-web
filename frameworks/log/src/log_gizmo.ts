import { define } from '@unional/gizmo'
import { createStandardLog, type LogMethodNames } from 'standard-log'
import { type IdGizmo, idGizmoFn } from '../../id/src/id_gizmo.js'
import { buildLogContext } from './log_gizmo.logic.js'
import type { LogGizmoOptions } from './log_gizmo.types.js'

/**
 * A gizmo function that creates a log gizmo.
 *
 * @require `IDGizmo`
 *
 * It is part of `justApp` and you normally don't need to use it directly.
 * But if you do, you can use it like this (with `@unional/gizmo`):
 *
 * @example
 * ```ts
 * import { incubate } from '@unional/gizmo'
 * import { idGizmoFn } from '@just-web/id'
 *
 * const gizmo = await incubate()
 *   .with(idGizmoFn({ name: 'your-app' })
 *   .with(logGizmoFn())
 *   .create()
 *
 * gizmo.log.info('hello world')
 * ```
 */
export const logGizmoFn = define(<N extends string = LogMethodNames>(options?: LogGizmoOptions<N>) => ({
	static: define.require(idGizmoFn),
	async create(ctx: IdGizmo) {
		const sl = createStandardLog<N>(options)
		return {
			log: buildLogContext<N>(ctx.name, sl, options)
		}
	}
}))

/**
 * A gizmo with log functionalities.
 *
 * It has default log methods which you can use directly:
 *
 * @example
 * ```ts
 * app.log.info('hello world')
 * app.log.error('something went wrong')
 * ```
 *
 * It also has `getLogger()` and `getNonConsoleLogger()` methods,
 * which you can create new loggers with appended `id`:
 *
 * @example
 * ```ts
 * const app = await justApp({ name: 'my-app }).create()
 * const logger = app.log.getLogger('my-logger')
 * logger.info('hello world') // my-app:my-logger: hello world
 * ```
 */
export type LogGizmo<N extends string = LogMethodNames> = define.Infer<typeof logGizmoFn<N>>
