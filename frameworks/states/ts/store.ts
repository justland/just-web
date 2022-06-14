import { getLogger, logLevels } from '@just-web/log'
import produce from 'immer'
import { pick } from 'type-plus'
import { createState, OnStateChange, ResetState, SetState } from './state'

export interface ReadonlyStore<T> {
  get(): T,
  onChange: OnStateChange<T>,
}

export interface Store<T> extends ReadonlyStore<T> {
  set: SetState<T>,
  update: (handler: (draft: T) => T | void) => void,
  reset: ResetState
}

/**
 * creates a object style store to track a value and its changes.
 */
export function createStore<T>(value: T): Store<T> {
  const state = createState(value)
  const [, set, onChange, reset] = state
  onChange(
    v => state[0] = v,
    { logger: getLogger('noop', { level: logLevels.none }) }
  )

  return {
    get() { return state[0] },
    set,
    update(handler) { set(produce(state[0], handler)) },
    onChange,
    reset
  }
}

export function toReadonlyStore<S extends Store<any>>(store: S): S extends Store<infer T> ? ReadonlyStore<T> : never {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return pick(store, 'get', 'onChange') as any
}
