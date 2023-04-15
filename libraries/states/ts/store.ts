import { pick } from 'type-plus'
import { createState, StateMeta, type OnStateChange, type ResetState, type SetState } from './state.js'
import type { Updater } from './types.js'

export type ReadonlyStore<T> = {
	get(): T
	onChange: OnStateChange<T>
}

export type Store<T> = ReadonlyStore<T> & {
	set: SetState<T>
	/**
	 * @deprecated `set()` covers all use cases
	 */
	update(handler: Updater<T>): void
	reset: ResetState
}

/**
 * Gets the Value type of the Registry (the `Record<K, T>`)
 */
export type StoreValue<S extends Store<any>> = ReturnType<S['get']>

/**
 * creates a object style store to track a value and its changes.
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
		update(handler) {
			set(handler)
		},
		onChange,
		reset
	}
}

export function toReadonlyStore<S extends Store<any>>(
	store: S
): S extends Store<infer T> ? ReadonlyStore<T> : never {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return pick(store, 'get', 'onChange') as any
}
