import produce, { Draft } from 'immer'
import { KeyTypes, Pick } from 'type-plus'
import { Store } from './store'

export interface Adder<T> {
  (...entries: T[]): void
}

/**
 * builds an adder function for a store or registry
 */
export function adder<T, A extends Array<T>, S extends Store<A>>(
  store: Pick<S, 'get' | 'set'>,
  addEntry: (record: Draft<A>, entry: T) => void
): Adder<T>
export function adder<T, K extends KeyTypes, S extends Store<Record<K, T>>>(
  store: Pick<S, 'get' | 'set'>,
  addEntry: (record: Draft<Record<K, T>>, entry: T) => void
): Adder<T>
export function adder<T, K extends KeyTypes = string | symbol>(
  store: Pick<Store<Record<K, T>>, 'get' | 'set'>,
  addEntry: (record: Draft<Record<K, T>>, entry: T) => void
) {
  return function (...entries: T[]) {
    store.set(produce(
      store.get(),
      s => entries.forEach(entry => addEntry(s, entry))
    ))
  }
}
