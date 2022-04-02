import { Adder, adder, createStore, ReadonlyStore, Store } from '@just-web/states'

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> { }

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
