import {
	define,
	incubate,
	type DepBuilder,
	type GizmoStatic,
	type IdGizmo,
	type LogGizmo
} from '@just-web/app'
import { browserGizmoFn, type BrowserGizmo, type BrowserGizmoOptions } from '@just-web/browser'
import { browserPreferencesGizmo } from '@just-web/browser-preferences'
import type { CommandsGizmo } from '@just-web/commands'
import { historyGizmoFn, type HistoryGizmo, type HistoryGizmoOptions } from '@just-web/history'
import type { KeyboardGizmo } from '@just-web/keyboard'

export type { ReadonlyErrorStore } from '@just-web/browser'
export type { BrowserHistory } from 'history'

export const presetsBrowserGizmoFn: (options?: {
	browser?: BrowserGizmoOptions
	history?: HistoryGizmoOptions
}) => GizmoStatic<
	DepBuilder<IdGizmo & LogGizmo & CommandsGizmo, KeyboardGizmo>,
	BrowserGizmo & HistoryGizmo
> = define((options?: { browser?: BrowserGizmoOptions; history?: HistoryGizmoOptions }) => ({
	static: define.require<IdGizmo>().require<LogGizmo>().require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create(ctx) {
		return incubate(ctx)
			.with(browserGizmoFn(options?.browser))
			.with(browserPreferencesGizmo)
			.with(historyGizmoFn(options?.history))
			.create()
	}
}))

export type PresetsBrowserGizmo = define.Infer<typeof presetsBrowserGizmoFn>
