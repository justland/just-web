import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import { ctx } from './browser_gizmo.ctx.js'
import { createErrorStore, toReadonlyErrorStore } from './error_store.js'
import type { ReadonlyErrorStore } from './error_store.types.js'

export interface BrowserGizmoOptions {
	/**
	 * Prevents the default event handler of `onerror` to be fired.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
	 */
	preventDefault?: boolean
}

export const browserGizmoFn: (options?: BrowserGizmoOptions) => GizmoStatic<
	DepBuilder<LogGizmo, unknown>,
	{
		browser: {
			errors: ReadonlyErrorStore
			sessionStorage: Storage
			localStorage: Storage
			navigator: Navigator
			location: Location
		}
	}
> = define((options?: BrowserGizmoOptions) => ({
	static: define.require<LogGizmo>(),
	async create({ log }) {
		const errors = createErrorStore()
		// Normally, gizmo should not do work during create.
		// However this is a special case as we want to listen to any error,
		// including those occurs during the creation phase.
		ctx.registerOnErrorHandler(
			{
				errors,
				preventDefault: options?.preventDefault ?? false
			},
			{ log }
		)

		return {
			browser: {
				errors: toReadonlyErrorStore(errors),
				sessionStorage,
				localStorage,
				navigator,
				location
			}
		}
	}
}))

export type BrowserGizmo = define.Infer<typeof browserGizmoFn>
