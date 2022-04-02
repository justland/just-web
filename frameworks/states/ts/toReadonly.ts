import { pick } from 'type-plus'
import { ReadonlyRegistry, Registry } from './registry'
import { ReadonlyStore, Store } from './store'

export function toReadonly<S extends Registry<any, any>>(registry: S): S extends Registry<infer K, infer T> ? ReadonlyRegistry<K, T> : never
export function toReadonly<S extends Store<any>>(store: S): S extends Store<infer T> ? ReadonlyStore<T> : never
export function toReadonly(store: any) {
  return pick(store, 'get', 'onChange')
}
