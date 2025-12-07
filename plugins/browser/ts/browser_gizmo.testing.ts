import { type DepBuilder, define, type GizmoStatic, incubate, type LogGizmo } from '@just-web/app'
import type { Fetch } from '@just-web/fetch'
import { type BrowserGizmo, type BrowserGizmoOptions, browserGizmoFn } from './browser_gizmo.js'

export interface BrowserTestGizmoOptions extends BrowserGizmoOptions {
	sessionStorage?: Storage | undefined
	localStorage?: Storage | undefined
	navigator?: Partial<Navigator> | undefined
	location?: Partial<Location> | undefined
	fetch?: Fetch
}

export const browserTestGizmoFn: (
	options?: BrowserTestGizmoOptions
) => GizmoStatic<DepBuilder<LogGizmo, unknown>, BrowserGizmo> = define((options?: BrowserTestGizmoOptions) => ({
	static: define.require<LogGizmo>(),
	async create(ctx) {
		const { browser, fetch } = await incubate(ctx).with(browserGizmoFn(options)).create()

		return {
			browser: {
				...browser,
				sessionStorage: options?.sessionStorage ?? browser.sessionStorage,
				localStorage: options?.localStorage ?? browser.localStorage,
				navigator: (options?.navigator ?? browser.navigator) as Navigator,
				location: (options?.location ?? browser.location) as Location
			},
			fetch
		}
	}
}))

export function stubStorage(): Storage {
	const m = new Map<string, string>()
	return {
		clear() {
			m.clear()
		},
		getItem(key: string) {
			return m.get(key) ?? null
		},
		get length() {
			return m.size
		},
		key(index) {
			let c = 0
			for (const e of m.keys()) {
				if (++c > index) return e
			}
			return null
		},
		removeItem(key: string) {
			m.delete(key)
		},
		setItem(key: string, value: string) {
			m.set(key, value)
		}
	}
}
