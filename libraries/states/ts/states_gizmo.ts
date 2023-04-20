import type { LogGizmo } from '@just-web/app'
import { define } from '@just-web/app'
import type { KeyTypes } from 'type-plus'
import { createRegistry } from './registry.js'
import { createState, type StateMeta } from './state.js'
import { createStore } from './store.js'

/**
 * A gizmo that provides states functionalities.
 *
 * It uses `immer` internally to perform state updates.
 *
 * @require LogGizmo
 *
 * @example
 * ```ts
 * const app = await justApp().with(statesGizmo).create()
 *
 * app.states.createState(0)
 * app.states.createStore(0)
 * app.states.createRegistry()
 * ```
 */
export const statesGizmo = define({
	static: define.require<LogGizmo>(),
	async create({ log }) {
		return {
			states: {
				/**
				 * creates a functional style state to track changes of a value.
				 *
				 * By default it will use the app logger.
				 *
				 * @param init initial value T
				 * @param meta optional meta data for custom logger.
				 * @returns [value: T, set: SetState<T>, onChange: OnStateChange<T>, reset: ResetState]
				 *
				 * @example
				 * ```ts
				 * const [value, set, onChange, reset] = app.states.createState(0)
				 *
				 * value // 0
				 * set(1) // value: 1
				 * onChange(v => console.log(v)) // trigger when set
				 * reset() // reset value to the initial value
				 * ```
				 */
				createState<T>(init: T, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createState(init, { logger })
				},
				/**
				 * creates a object style store to track a value and its changes.
				 *
				 * By default it will use the app logger.
				 *
				 * @param init initial value T
				 * @param meta optional meta data for custom logger.
				 * @returns { get, set, update, onChange, reset }
				 *
				 * @example
				 * ```ts
				 * const store = app.states.createStore(0)
				 *
				 * store.get() // 0
				 * store.set(1) // 1
				 * store.update(v => v + 1) // 2
				 * store.onChange(v => console.log(v)) // trigger when set or update
				 * store.reset() // reset value to the initial value
				 * ```
				 */
				createStore<T>(init: T, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createStore(init, { logger })
				},
				/**
				 * Creates a registry to track a record and its changes.
				 * A registry is similar to a `store` but specialized for records.
				 *
				 * It provides additional methods such as `keys()` and `has()`.
				 *
				 * By default it will use the app logger.
				 *
				 * @param init optional initial value T
				 * @param meta optional meta data for custom logger.
				 * @returns { get, set, update, onChange, reset }
				 *
				 * @example
				 * ```ts
				 * const registry = app.states.createRegistry()
				 *
				 * registry.update(v => { v.x = 1 })
				 * registry.keys() // ['x']
				 * registry.has('x') // true
				 * registry.size() // 1
				 * registry.values() // [1]
				 * ```
				 */
				createRegistry<K extends KeyTypes, T>(init?: Record<K, T>, meta?: StateMeta) {
					const logger = meta?.logger ?? log.getLogger()
					return createRegistry(init, { logger })
				}
			}
		}
	}
})

/**
 * A gizmo that provides states functionalities.
 */
export type StatesGizmo = define.Infer<typeof statesGizmo>
