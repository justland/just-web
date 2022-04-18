export interface SetState<T> {
  (value: T): void
}

export interface StateChangeHandler<T> {
  (value: T, prev: T): void
}

export interface OnStateChange<T> {
  (handler: StateChangeHandler<T>): void
}

export interface ResetState {
  (): void
}

/**
 * creates a functional style state to track changes of a value.
 */
export function createState<T>(init: T):
  [T, SetState<T>, OnStateChange<T>, ResetState] {
  const handlers: StateChangeHandler<T>[] = []
  let value = Object.freeze(init)
  function set(newValue: T) {
    if (Object.is(value, newValue)) return

    const old = value
    value = Object.freeze(newValue)
    handlers.forEach(h => h(value, old))
  }

  function onChange(handler: StateChangeHandler<T>) {
    if (handlers.includes(handler)) return
    handlers.push(handler)
  }

  function reset() { set(init) }

  return [
    value,
    set,
    onChange,
    reset
  ]
}
