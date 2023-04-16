import type { LogGizmo } from '@just-web/app'
import { define } from '@just-web/app'
import type { KeyTypes } from 'type-plus'
import { createRegistry } from './registry.js'
import { createState, type StateMeta } from './state.js'
import { createStore } from './store.js'

export const statesGizmo = define({
	static: define.require<LogGizmo>(),
	async create({ log }) {
		return {
			states: {
				createState<T>(init: T, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createState(init, { logger })
				},
				createStore<T>(init: T, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createStore(init, { logger })
				},
				createRegistry<K extends KeyTypes, T>(init?: Record<K, T>, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createRegistry(init, { logger })
				}
			}
		}
	}
})
