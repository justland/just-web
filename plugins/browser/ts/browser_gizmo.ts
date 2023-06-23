import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import { type Fetch, type FetchGizmo } from '@just-web/fetch'
import { ctx } from './browser_gizmo.ctx.js'
import { createErrorStore, toReadonlyErrorStore } from './error_store.js'
import type { ReadonlyErrorStore } from './error_store.types.js'
import { BrowserError } from './errors.js'

export type { Fetch, FetchGizmo }

export interface BrowserGizmoOptions {
	/**
	 * Prevents the default event handler of `onerror` to be fired.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
	 */
	preventDefault?: boolean
	/**
	 * Custom fetch instance
	 */
	fetch?: Fetch
}

export const browserGizmoFn: (options?: BrowserGizmoOptions) => GizmoStatic<
	DepBuilder<LogGizmo, unknown>,
	[
		{
			browser: {
				errors: ReadonlyErrorStore
				sessionStorage: Storage
				localStorage: Storage
				navigator: Navigator
				location: Location
			}
			fetch: Fetch
		},
		() => () => void
	]
> = define((options?: BrowserGizmoOptions) => ({
	static: define.require<LogGizmo>().optional<FetchGizmo>(),
	async create(gizmoCtx) {
		const errors = createErrorStore()
		const logger = gizmoCtx.log.getLogger(`@just-web/browser`)
		const preventDefault = options?.preventDefault ?? false

		// Normally, gizmo should not do work during create.
		// However this is a special case as we want to listen to any error,
		// including those occurs during the creation phase.
		function listener(ev: ErrorEvent) {
			if (preventDefault) ev.preventDefault()
			const e = new BrowserError(ev.message, ev.filename, ev.lineno, ev.colno, ev.error)
			errors.add(e)
			logger.error(`onerror detected`, e)
			return preventDefault
		}
		ctx.addEventListener('error', listener)

		const { fetch, sessionStorage, localStorage, navigator, location } = ctx

		return [
			{
				browser: {
					errors: toReadonlyErrorStore(errors),
					sessionStorage,
					localStorage,
					navigator,
					location
				},
				fetch: options?.fetch ?? gizmoCtx.fetch ?? fetch
			},
			// This is no effect right now as `just-web` does not yet support clean up
			() => () => ctx.removeEventListener('error', listener)
		]
	}
}))

export type BrowserGizmo = define.Infer<typeof browserGizmoFn>
