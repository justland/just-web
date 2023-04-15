import type { LogGizmo } from '@just-web/log'
import { define } from '@unional/gizmo'
import { createState, type StateMeta } from './state.js'

export const statesGizmo = define({
	static: define.require<LogGizmo>(),
	async create({ log }) {
		return {
			states: {
				createState<T>(init: T, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createState(init, { logger })
				}
			}
		}
	}
})
