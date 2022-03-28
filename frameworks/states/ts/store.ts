import { OnStateChange, SetState } from './state'

export function createStore<T>(value: T) {
  let setter: SetState<T> = v => value = v
  return {
    get() { return value },
    set(value: T) { setter(value) },
    activate(
      v: T,
      setValue: SetState<T>,
      onChange: OnStateChange<T>) {
      value = v
      onChange(v => value = v)
      setter = setValue
    }
  }
}
