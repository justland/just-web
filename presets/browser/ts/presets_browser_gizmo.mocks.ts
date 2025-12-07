import { define, type IdGizmo, incubate, type LogGizmo } from '@just-web/app'
import { type BrowserTestGizmoOptions, browserTestGizmoFn } from '@just-web/browser/testing'
import { browserPreferencesGizmo } from '@just-web/browser-preferences'
import type { CommandsGizmo } from '@just-web/commands'
import { type HistoryGizmoOptions, historyGizmoFn } from '@just-web/history'
import { createMemoryHistory } from '@just-web/history/testing'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { omit } from 'type-plus'
import type { PresetsBrowserGizmo } from './presets_browser_gizmo.js'

export interface PresetsBrowserTestGizmoOptions {
	browser?: BrowserTestGizmoOptions
	history?: HistoryGizmoOptions
}

export const presetsBrowserTestGizmoFn = define((options?: PresetsBrowserTestGizmoOptions) => ({
	static: define.require<IdGizmo>().require<LogGizmo>().require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create(ctx): Promise<PresetsBrowserGizmo> {
		return omit(
			await incubate(ctx)
				.with(browserTestGizmoFn(options?.browser))
				.with(browserPreferencesGizmo)
				.with(historyGizmoFn(options?.history ?? { history: createMemoryHistory() }))
				.create(),
			'name',
			'id',
			'log',
			'keyboard',
			'commands'
		)
	}
}))
