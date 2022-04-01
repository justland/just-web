import { record } from 'type-plus'
import { createStore } from './store'

export function createRegistry<T>(init?: Record<string | symbol, T>) {
  const store = createStore(record<string | symbol, T>(init))
  return {
    ...store,
    size() {
      const r = store.get()
      return Object.keys(r).length + Object.getOwnPropertySymbols(r).length
    }
  }
}
