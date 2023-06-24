import { define } from '@just-web/app'
import { type Fetch } from './fetch.js'

/**
 * Gizmo provides Fetch API
 */
export const fetchGizmo = define({
	create() {
		return {
			fetch: globalThis.fetch.bind(globalThis) as Fetch
		}
	}
})

export type FetchGizmo = define.Infer<typeof fetchGizmo>
