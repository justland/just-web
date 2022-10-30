import { getLogger, Logger, logLevels } from '@just-web/log'
import produce, { nothing } from 'immer'
import { tersify } from 'tersify'
import { AnyFunction, isPromise } from 'type-plus'
import type { Updater } from './types'

export const stateLog = getLogger('@just-web/states:state')

export type SetStateValue<T> = T | Updater<T>

/**
 * set or update the state.
 */
export type SetState<T> = (<V extends SetStateValue<T> = SetStateValue<T>>(value: V, meta?: { logger?: Logger }) => V extends AnyFunction<any, Promise<any>> ? Promise<T> : T)

export type StateChangeHandler<T> = (value: T, prev: T) => void

export type OnStateChange<T> = (handler: StateChangeHandler<T>, meta?: { logger?: Logger }) => (() => void)

export type ResetState = () => void

/**
 * creates a functional style state to track changes of a value.
 */
export function createState<T>(init: T)
  : [value: T, set: SetState<T>, onChange: OnStateChange<T>, reset: ResetState] {
  const handlers: StateChangeHandler<T>[] = []
  let value = Object.freeze(init)

  function notifyAfterSet(old: T, value: T, meta?: { logger?: Logger }) {
    const log = meta?.logger ?? stateLog
    log.planck(`state changed:`, old, value)
    handlers.forEach(h => h(value, old))
    return value
  }

  function set(
    newValue: T
      | ((draft: T) => T | void | typeof nothing)
      | ((draft: T) => Promise<T | void | typeof nothing>),
    meta?: { logger?: Logger }) {
    if (Object.is(value, newValue)) return newValue

    const old = value
    if (typeof init === 'function' || typeof newValue !== 'function') {
      value = Object.freeze(newValue as T)
    }
    else {
      const r = produce(old, newValue as any)
      if (isPromise(r)) {
        return r.then(v => {
          value = Object.freeze(v)
          return notifyAfterSet(old, value, meta)
        })
      }
      else {
        value = Object.freeze(r)
      }
    }
    return notifyAfterSet(old, value, meta)
  }

  function onChange(handler: StateChangeHandler<T>, meta?: { logger?: Logger }) {
    if (handlers.includes(handler)) return () => { }
    const log = meta?.logger ?? stateLog
    log.on(logLevels.trace, log => log(`new onChange handler: ${tersify(handler)}`))
    handlers.push(handler)
    return () => { handlers.splice(handlers.indexOf(handler), 1) }
  }

  function reset() { set(init) }

  return [value, set as any, onChange, reset]
}
