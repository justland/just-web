import { KeyTypes, record } from 'type-plus'
import { createStore } from './store'

/**
 * @note doing a weird construct to put T before K,
 * as TypeScript do not yet support optional generic,
 * and inferring K as string | symbol is a common usage.
 */
export function createRegistry<T, K extends KeyTypes = string | symbol>(init?: Record<K, T>) {
  const store = createStore(record<K, T>(init))
  return {
    ...store,
    keys() {
      const r = store.get()
      return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)]
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
