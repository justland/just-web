import { pick } from 'type-plus'
import { createState, type OnStateChange, type ResetState, type SetState, type StateMeta } from './state.js'

export type ReadonlyStore<T> = {
	get(): T
	onChange: OnStateChange<T>
}

/**
 * A store tracks a value and its changes.
 */
export type Store<T> = ReadonlyStore<T> & {
	set: SetState<T>
	reset: ResetState
}

/**
 * The Store Value type.
 */
export type StoreValue<S extends Store<any>> = ReturnType<S['get']>

/**
 * creates a object style store to track a value and its changes.
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
export function createStore<T>(value: T, meta?: StateMeta): Store<T> {
	const state = createState(value, meta)
	const [, set, onChange, reset] = state
	onChange(v => (state[0] = v))

	return {
		get() {
			return state[0]
		},
		set,
		onChange,
		reset
	}
}

/**
 * Convert a store to a readonly store.
 */
export function toReadonlyStore<S extends Store<any>>(store: S): S extends Store<infer T> ? ReadonlyStore<T> : never {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return pick(store, 'get', 'onChange') as any
}
