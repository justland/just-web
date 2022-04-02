import { Adder, adder, createStore, ReadonlyStore, Store } from '@just-web/states'
import { pick } from 'type-plus'

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> {
  add: Adder<Error>
}

export interface ErrorStore extends Store<Error[]> {
  add: Adder<Error>
}

export function createErrorStore(): ErrorStore {
  const errors = createStore<Error[]>([])

  return {
    ...errors,
    add: adder(errors, (record, entry) => record.push(entry))
  }
}

export function toReadonlyErrorStore(store: ErrorStore): ReadonlyErrorStore {
  return pick(store, 'get', 'onChange', 'add')
}
