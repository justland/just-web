
export interface SetState<T> {
  (value: T): void
}

export interface StateChangeHandler<T> {
  (value: T, prev: T): void
}

export interface OnStateChange<T> {
  (handler: StateChangeHandler<T>): void
}

export function createState<T>(value: T): [T, SetState<T>, OnStateChange<T>] {
  const handlers: StateChangeHandler<T>[] = []

  return [
    value,
    (newValue: T) => {
      if (value === newValue) return

      const old = value
      value = newValue
      handlers.forEach(h => h(newValue, old))
    },
    (handler: StateChangeHandler<T>) => { handlers.push(handler) }
  ]
}
