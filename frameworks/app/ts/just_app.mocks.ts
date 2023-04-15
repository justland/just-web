import { logTestGizmo } from '@just-web/framework/testing'
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
export function justTestApp(options: AppBuilderOptions = { name: 'test' }) {
	return incubateApp(options).with(logTestGizmo(options.log))
}
