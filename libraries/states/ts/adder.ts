import produce, { Draft } from 'immer'
import type { ArrayValue, KeyTypes, Pick } from 'type-plus'
import { Registry } from './registry'
import type { Store } from './store'

export interface Adder<T> {
  (...entries: T[]): void
}

export interface WithAdder<T> {
  add: Adder<T>
}

/**
 * builds an adder function for a store or registry
 */
export function adder<A extends Array<any>, S extends Store<A>>(
  store: Pick<S, 'get' | 'set'>,
  addEntry: (record: Draft<A>, entry: ArrayValue<A>) => void
): Adder<ArrayValue<A>>
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

export function withAdder<T, K extends KeyTypes, R extends Registry<K, T>>(
  registry: Pick<R, 'get' | 'set'>,
  addEntry: (record: Draft<Record<K, T>>, entry: T) => void
): R & WithAdder<T>
export function withAdder<A extends Array<any>, S extends Store<A>>(
  store: Pick<S, 'get' | 'set'>,
  addEntry: (record: Draft<A>, entry: ArrayValue<A>) => void
): S & WithAdder<ArrayValue<A>>
export function withAdder<T, K extends KeyTypes, S extends Store<Record<K, T>>>(
  store: Pick<S, 'get' | 'set'>,
  addEntry: (record: Draft<Record<K, T>>, entry: T) => void
): S & WithAdder<T>
export function withAdder<T, K extends KeyTypes = string | symbol>(
  store: Pick<Store<Record<K, T>>, 'get' | 'set'>,
  addEntry: (record: Draft<Record<K, T>>, entry: T) => void
) {
  return {
    ...store,
    add: adder(store, addEntry)
  }
}

export function push<A extends Array<any>>(record: Draft<A>, entry: ArrayValue<A>) {
  record.push(entry)
}

export function unshift<A extends Array<any>>(record: Draft<A>, entry: ArrayValue<A>) {
  record.unshift(entry)
}
