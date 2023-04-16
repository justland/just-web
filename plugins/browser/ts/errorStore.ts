import { createStore, push, withAdder, type Store, type WithAdder } from '@just-web/states'
import { pick } from 'type-plus'
import type { ReadonlyErrorStore } from './types.js'

export interface ErrorStore extends Store<Error[]>, WithAdder<Error> {}

export function createErrorStore(): ErrorStore {
	return withAdder(createStore<Error[]>([]), push)
}

export function toReadonlyErrorStore(store: ErrorStore): ReadonlyErrorStore {
	return pick(store, 'get', 'onChange')
}
