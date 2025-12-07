import { define, type IdGizmo, incubate, type LogGizmo } from '@just-web/app'
import { browserPreferencesGizmo } from '@just-web/browser-preferences'
import { browserTestGizmoFn, type BrowserTestGizmoOptions } from '@just-web/browser/testing'
import type { CommandsGizmo } from '@just-web/commands'
import { historyGizmoFn, type HistoryGizmoOptions } from '@just-web/history'
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
