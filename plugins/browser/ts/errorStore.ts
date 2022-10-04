import { createStore, push, Store, withAdder, WithAdder } from '@just-web/states'
import { pick } from 'type-plus'
import { ReadonlyErrorStore } from './types'

export interface ErrorStore extends Store<Error[]>, WithAdder<Error> { }

export function createErrorStore(): ErrorStore {
  return withAdder(createStore<Error[]>([]), push)
}

export function toReadonlyErrorStore(store: ErrorStore): ReadonlyErrorStore {
  return pick(store, 'get', 'onChange')
}
