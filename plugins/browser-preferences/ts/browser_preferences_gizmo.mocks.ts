import { justTestApp, type JustAppTestOptions } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { preferencesGizmo } from '@just-web/preferences'
import { browserPreferencesGizmo } from './index.js'
import { ctx } from './local_storage_store.ctx.js'

export function browserPreferencesGizmoTestApp(options?: JustAppTestOptions) {
	return justTestApp(options)
		.with(keyboardGizmoFn())
		.with(commandsGizmoFn())
		.with(preferencesGizmo)
		.with(browserPreferencesGizmo)
		.create()
}

/**
 * Reset localStorage to the real one.
 *
 * Typically used after stubbing localStorage.
 *
 * @example
 * ```ts
 * afterEach(resetLocalStorage)
 * ```
 */
export function resetLocalStorage() {
	ctx.getLocalStorage = () => localStorage
}

/**
 * Stub localStorage for testing.
 *
 * @example
 * ```ts
 * stubLocalStorage({
 *  setItem() { fail('should not reach') }
 * })
 * ```
 */
export function stubLocalStorage(stub: Partial<Storage>) {
	ctx.getLocalStorage = () =>
		new Proxy(localStorage, {
			get(target, p: any) {
				return stub[p] ? stub[p] : target[p]
			}
		})
}
