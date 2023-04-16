import { define, DepBuilder, GizmoStatic, type LogGizmo } from '@just-web/app'
import { ctx } from './browser_gizmo.ctx.js'
import { createErrorStore, toReadonlyErrorStore } from './error_store.js'
import { ReadonlyErrorStore } from './error_store.types.js'

export type BrowserGizmoOptions = {
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
		}
	}
> = define((options?: BrowserGizmoOptions) => ({
	static: define.require<LogGizmo>(),
	async create({ log }) {
		const errors = createErrorStore()
		// Normally, gizmo should not do work during create.
		// However this is a special case as we want to listen to any error,
		// including those occurs during the creation phrase.
		ctx.registerOnErrorHandler(
			{
				errors,
				preventDefault: options?.preventDefault ?? false
			},
			{ log }
		)
		return {
			browser: {
				errors: toReadonlyErrorStore(errors)
			}
		}
	}
}))
