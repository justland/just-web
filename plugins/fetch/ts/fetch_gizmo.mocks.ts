import { define } from '@just-web/app'
import type { Fetch } from './fetch.js'

export interface FetchTestGizmoOptions {
	fetch?: Fetch
}

export const fetchTestGizmoFn = (options?: FetchTestGizmoOptions) =>
	define({
		create() {
			return {
				fetch: options?.fetch ?? (fetch as Fetch)
			}
		}
	})
