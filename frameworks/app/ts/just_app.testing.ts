import { LogTestGizmoOptions, logTestGizmoFn, type LogTestGizmo } from '@just-web/log/testing'
import { incubateApp } from './just_app.logic.js'
import type { IdGizmo, IdGizmoOptions } from './just_web_id.js'

export type JustAppTestOptions = Partial<IdGizmoOptions> & { log?: LogTestGizmoOptions }

/**
 * Create a test jest-app.
 *
 * It contains a log gizmo with memory reporter by default.
 *
 * ```ts
 * const app = await justTestApp().create()
 * app.log.info('hello')
 * app.log.reporter.... // to inspect the logs
 * ```
 */
export function justTestApp(options?: JustAppTestOptions) {
	const name = options?.name ?? 'test'
	return incubateApp({ name }).with(logTestGizmoFn(options?.log))
}

export type JustTestApp = IdGizmo & LogTestGizmo
