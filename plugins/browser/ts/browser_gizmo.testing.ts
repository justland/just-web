import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import { browserGizmoFn, type BrowserGizmo, type BrowserGizmoOptions } from './browser_gizmo.js'

export type BrowserTestGizmoOptions = BrowserGizmoOptions & {
	sessionStorage?: Storage | undefined
	localStorage?: Storage | undefined
}

export const browserTestGizmoFn: (
	options?: BrowserTestGizmoOptions
) => GizmoStatic<DepBuilder<LogGizmo, unknown>, BrowserGizmo> = define(
	(options?: BrowserTestGizmoOptions) => ({
		static: define.require<LogGizmo>(),
		async create(ctx) {
			const { browser } = await ctx.with(browserGizmoFn(options))

			return {
				browser: {
					...browser,
					sessionStorage: options?.sessionStorage ?? browser.sessionStorage,
					localStorage: options?.localStorage ?? browser.localStorage
				}
			}
		}
	})
)
