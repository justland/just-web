import { Draft } from 'immer'
import { KeyTypes, pick, Widen } from 'type-plus'
import { OnStateChange, ResetState, SetState, StateMeta } from './state.js'
import { createStore } from './store.js'

export type ReadonlyRegistry<K extends KeyTypes, T> = {
	get(): Record<K, T>
	onChange: OnStateChange<Record<K, T>>
	keys(): K[]
	has(key: K): boolean
	size(): number
	list(): T[]
}

export type Registry<K extends KeyTypes, T> = ReadonlyRegistry<K, T> & {
	set: SetState<Record<K, T>>
	/**
	 * @deprecated `set()` provides the same functionality
	 */
	update(handler: (draft: Draft<Record<K, T>>) => Record<K, T> | void): void
	reset: ResetState
}

/**
 * Gets the Value type of the Registry (the `Record<K, T>`)
 */
export type RegistryValue<R extends Registry<any, any>> = ReturnType<R['get']>

export function createRegistry<K extends KeyTypes, T>(
	init = {} as Record<K, T>,
	meta?: StateMeta
): Registry<Widen<K>, T> {
	const store = createStore<Record<Widen<K>, T>>(init as any, meta)

	return {
		...store,
		keys() {
			const r = store.get()
			return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)] as Widen<K>[]
		},
		has(key) {
			return !!store.get()[key]
		},
		size() {
			return this.keys().length
		},
		list(): T[] {
			const r = store.get()
			return this.keys().map(k => r[k])
		}
	}
}

export function toReadonlyRegistry<S extends Registry<any, any>>(
	registry: S
): S extends Registry<infer K, infer T> ? ReadonlyRegistry<K, T> : never {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return pick(registry, 'get', 'has', 'onChange', 'keys', 'size', 'list') as any
}
