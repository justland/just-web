import { createStore, push, withAdder } from '@just-web/states'
import { pick } from 'type-plus'
import type { ErrorStore, ReadonlyErrorStore } from './error_store.types.js'

export function createErrorStore(): ErrorStore {
	return withAdder(createStore<Error[]>([]), push)
}

export function toReadonlyErrorStore(store: ErrorStore): ReadonlyErrorStore {
	return pick(store, 'get', 'onChange')
}
