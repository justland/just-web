import { KeyTypes, pick, record, Widen } from 'type-plus'
import { OnStateChange, ResetState, SetState } from './state'
import { createStore } from './store'

export interface ReadonlyRegistry<K extends KeyTypes, T> {
  get(): Record<K, T>,
  onChange: OnStateChange<Record<K, T>>,
  keys(): K[],
  has(key: K): boolean,
  size(): number,
  list(): T[]
}

export interface Registry<K extends KeyTypes, T> extends ReadonlyRegistry<K, T> {
  set: SetState<Record<K, T>>,
  update(handler: (draft: Record<K, T>) => Record<K, T> | void): void,
  reset: ResetState
}

export function createRegistry<K extends KeyTypes, T>(init?: Record<K, T>): Registry<Widen<K>, T> {
  const store = createStore<Record<Widen<K>, T>>(record(init))

  return {
    ...store,
    keys() {
      const r = store.get()
      return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)] as Widen<K>[]
    },
    has(key) { return !!store.get()[key] },
    size() { return this.keys().length },
    list(): T[] {
      const r = store.get()
      return this.keys().map(k => r[k])
    }
  }
}

export function toReadonlyRegistry<S extends Registry<any, any>>(registry: S): S extends Registry<infer K, infer T> ? ReadonlyRegistry<K, T> : never {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return pick(registry, 'get', 'has', 'onChange', 'keys', 'size', 'list') as any
}
