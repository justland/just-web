import { createState } from './state'

/**
 * creates a object style store to track a value and its changes.
 */
export function createStore<T>(value: T) {
  const state = createState(value)
  const [, set, onChange] = state
  onChange(v => state[0] = v)
  return {
    get() { return state[0] },
    set,
    onChange
  }
}
