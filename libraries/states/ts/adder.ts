import type { Draft } from 'immer'
import type { ArrayValue, KeyTypes, Pick, RecordValue } from 'type-plus'
import type { Registry, RegistryValue } from './registry.js'
import type { Store, StoreValue } from './store.js'

export type Adder<T> = (...entries: T[]) => void

export type WithAdder<T> = {
  add: Adder<T>
}

/**
 * builds an adder function for a store or registry
 */
export function adder<R extends Registry<any, any>>(
  registry: R,
  handler: (record: Draft<RegistryValue<R>>, entry: RecordValue<RegistryValue<R>>) => void
): R & Adder<ReturnType<RecordValue<RegistryValue<R>>>>
export function adder<A extends Array<any>, S extends Store<A>>(
  store: S,
  handler: (record: Draft<A>, entry: ArrayValue<A>) => void
): Adder<ArrayValue<A>>
export function adder<S extends Store<Record<KeyTypes, any>>>(
  store: S,
  handler: (record: Draft<StoreValue<S>>, entry: RecordValue<StoreValue<S>>) => void
): Adder<RecordValue<StoreValue<S>>>
export function adder<T>(
  store: Pick<Store<any>, 'set'>,
  handler: (record: Draft<any>, entry: T) => void
) {
  return function (...entries: T[]) {
    store.set((s: any) => entries.forEach(entry => handler(s, entry)))
  }
}

export function withAdder<R extends Registry<any, any>>(
  registry: R,
  addEntry: (record: Draft<RegistryValue<R>>, entry: RecordValue<RegistryValue<R>>) => void
): R & WithAdder<RecordValue<RegistryValue<R>>>
export function withAdder<A extends Array<any>, S extends Store<A>>(
  store: S,
  addEntry: (record: Draft<A>, entry: ReturnType<S['get']>) => void
): S & WithAdder<ArrayValue<ReturnType<S['get']>>>
export function withAdder<S extends Store<Record<any, any>>>(
  store: S,
  addEntry: (record: Draft<StoreValue<S>>, entry: RecordValue<StoreValue<S>>) => void
): S & WithAdder<RecordValue<StoreValue<S>>>
export function withAdder<S extends Store<any>>(
  store: S,
  addEntry: (record: Draft<StoreValue<S>>, entry: any) => void
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
