import { KeyTypes, record, Widen } from 'type-plus'
import { OnStateChange, ResetState, SetState } from './state'
import { createStore } from './store'
export interface ReadonlyRegistry<T, K extends KeyTypes = string | symbol> {
  get(): Record<Widen<K>, T>,
  onChange: OnStateChange<Record<Widen<K>, T>>,
  keys(): K[],
  size(): number,
  list(): T[]
}

export interface Registry<T, K extends KeyTypes = string | symbol> extends ReadonlyRegistry<T, K> {
  set: SetState<Record<Widen<K>, T>>,
  reset: ResetState
}


/**
 * @note doing a weird construct to put T before K,
 * as TypeScript do not yet support optional generic,
 * and inferring K as string | symbol is a common usage.
 */
export function createRegistry<
  T,
  K extends KeyTypes = string | symbol
>(init?: Record<K, T>): Registry<T, K> {
  const store = createStore(record<K, T>(init))
  return {
    ...store,
    keys() {
      const r = store.get()
      return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)] as K[]
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
