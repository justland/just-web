import { logTestGizmoFn } from '@just-web/log/testing'
import type { PartialPick } from 'type-plus'
import { incubateApp } from './just_app.logic.js'
import type { AppBuilderOptions } from './just_app.types.js'

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
export function justTestApp(options?: PartialPick<AppBuilderOptions, 'name'>) {
	const name = options?.name ?? 'test'
	return incubateApp({ name }).with(logTestGizmoFn(options?.log))
}
