import { getLogger, Logger, logLevels } from '@just-web/log'
import { tersify } from 'tersify'

export const stateLog = getLogger('@just-web/states:state')

export interface SetState<T> {
  (value: T, meta?: { logger?: Logger }): void
}

export interface StateChangeHandler<T> {
  (value: T, prev: T): void
}

export interface OnStateChange<T> {
  (handler: StateChangeHandler<T>, meta?: { logger?: Logger }): () => void
}

export interface ResetState {
  (): void
}

/**
 * creates a functional style state to track changes of a value.
 */
export function createState<T>(init: T): [T, SetState<T>, OnStateChange<T>, ResetState] {
  const handlers: StateChangeHandler<T>[] = []
  let value = Object.freeze(init)
  function set(newValue: T, meta?: { logger?: Logger }) {
    if (Object.is(value, newValue)) return

    const old = value
    value = Object.freeze(newValue)
    const log = meta?.logger ?? stateLog
    log.planck(`state changed:`, old, value)
    handlers.forEach(h => h(value, old))
  }

  function onChange(handler: StateChangeHandler<T>, meta?: { logger?: Logger }) {
    if (handlers.includes(handler)) return () => { }
    const log = meta?.logger ?? stateLog
    log.on(logLevels.trace, log => log(`new onChange handler: ${tersify(handler)}`))
    handlers.push(handler)
    return () => { handlers.splice(handlers.indexOf(handler), 1) }
  }

  function reset() { set(init) }

  return [
    value,
    set,
    onChange,
    reset
  ]
}
