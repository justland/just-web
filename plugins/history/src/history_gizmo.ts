import { define, type GizmoBase } from '@just-web/app'
import { createBrowserHistory } from 'history'
import type { History } from './history.types.js'

export type HistoryGizmoOptions = {
	history: History
}

/**
 * History Gizmo.
 *
 * By default, it uses `createBrowserHistory()`.
 * You can pass your own `history` instance in the options.
 */
export const historyGizmoFn: (options?: HistoryGizmoOptions) => GizmoBase<{
	history: History
}> = define((options?: HistoryGizmoOptions) => ({
	async create() {
		return { history: options?.history ?? createBrowserHistory() }
	}
}))

export type HistoryGizmo = define.Infer<typeof historyGizmoFn>
