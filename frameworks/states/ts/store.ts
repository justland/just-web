import { pick } from 'type-plus'
import { createState, OnStateChange, ResetState, SetState } from './state'

export interface ReadonlyStore<T> {
  get(): T,
  onChange: OnStateChange<T>,
}

export interface Store<T> extends ReadonlyStore<T> {
  set: SetState<T>,
  reset: ResetState
}

/**
 * creates a object style store to track a value and its changes.
 */
export function createStore<T>(value: T): Store<T> {
  const state = createState(value)
  const [, set, onChange, reset] = state
  onChange(v => state[0] = v)
  return {
    get() { return state[0] },
    set,
    onChange,
    reset
  }
}

export function toReadonlyStore<S extends Store<any>>(store: S): S extends Store<infer T> ? ReadonlyStore<T> : never {
  return pick(store, 'get', 'onChange') as any
}
