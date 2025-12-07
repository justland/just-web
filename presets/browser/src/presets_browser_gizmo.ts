import { define, type IdGizmo, incubate, type LogGizmo } from '@just-web/app'
import { type BrowserGizmoOptions, browserGizmoFn } from '@just-web/browser'
import { browserPreferencesGizmo } from '@just-web/browser-preferences'
import type { CommandsGizmo } from '@just-web/commands'
import { type HistoryGizmoOptions, historyGizmoFn } from '@just-web/history'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { omit } from 'type-plus'

export interface PresetsBrowserGizmoOptions {
	browser?: BrowserGizmoOptions
	history?: HistoryGizmoOptions
}

export const presetsBrowserGizmoFn = define((options?: PresetsBrowserGizmoOptions) => ({
	static: define.require<IdGizmo>().require<LogGizmo>().require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create(ctx) {
		return omit(
			await incubate(ctx)
				.with(browserGizmoFn(options?.browser))
				.with(browserPreferencesGizmo)
				.with(historyGizmoFn(options?.history))
				.create(),
			'name',
			'id',
			'log',
			'keyboard',
			'commands'
		)
	}
}))

export type PresetsBrowserGizmo = define.Infer<typeof presetsBrowserGizmoFn>
