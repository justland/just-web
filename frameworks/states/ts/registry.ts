import { KeyTypes, record, Widen } from 'type-plus'
import { OnStateChange, ResetState, SetState } from './state'
import { createStore } from './store'
export interface ReadonlyRegistry<K extends KeyTypes, T> {
  get(): Record<K, T>,
  onChange: OnStateChange<Record<K, T>>,
  keys(): K[],
  size(): number,
  list(): T[]
}

export interface Registry<K extends KeyTypes, T> extends ReadonlyRegistry<K, T> {
  set: SetState<Record<K, T>>,
  reset: ResetState
}

export function createRegistry<
  K extends KeyTypes,
  T,
  >(init?: Record<K, T>): Registry<Widen<K>, T> {
  const store = createStore<Record<Widen<K>, T>>(record(init))
  return {
    ...store,
    keys() {
      const r = store.get()
      return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)] as Widen<K>[]
    },
    size() {
      return this.keys().length
    },
    list(): T[] {
      const r = store.get()
      return this.keys().map(k => (r as any)[k])
    }
  }
}
