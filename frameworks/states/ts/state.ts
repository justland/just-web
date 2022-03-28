
export interface SetState<T> {
  (value: T): void
}

export interface StateChangeHandler<T> {
  (value: T, prev: T): void
}

export interface OnStateChange<T> {
  (handler: StateChangeHandler<T>): void
}

export function createState<T>(initValue: T): [T, SetState<T>, OnStateChange<T>] {
  const handlers: StateChangeHandler<T>[] = []

  // ? maybe I don't even need this?
  let value = initValue

  return [
    value,
    (newValue: T) => {
      const old = value
      value = newValue
      handlers.forEach(h => h(value, old))
    },
    (handler: StateChangeHandler<T>) => { handlers.push(handler) }
  ]
}
