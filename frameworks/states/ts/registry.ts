import { KeyTypes, record } from 'type-plus'
import { createStore } from './store'

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
