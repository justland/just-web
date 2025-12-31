import { type Logger, logLevels } from '@just-web/app'
import { nothing, produce } from 'immer'
import { tersify } from 'tersify'
import { type AnyFunction, isPromise } from 'type-plus'
import { getDefaultLogger } from './log.js'
import type { Updater } from './types.js'

export type SetStateValue<T> = T | Updater<T>

/**
 * set or update the state.
 */
export type SetState<T> = <V extends SetStateValue<T> = SetStateValue<T>>(
	value: V
) => V extends AnyFunction<any, Promise<any>> ? Promise<T> : T

export type StateChangeHandler<T> = (value: T, prev: T) => void

export type OnStateChange<T> = (handler: StateChangeHandler<T>) => () => void

export type ResetState = () => void

export type StateMeta = { logger?: Logger }

/**
 * creates a functional style state to track changes of a value.
 *
 * @param init initial value T
 * @param meta optional meta data for custom logger.
 * @returns [value: T, set: SetState<T>, onChange: OnStateChange<T>, reset: ResetState]
 *
 * @example
 * ```ts
 * const [value, set, onChange, reset] = app.states.createState(0)
 *
 * value // 0
 * set(1) // value: 1
 * onChange(v => console.log(v)) // trigger when set
 * reset() // reset value to the initial value
 * ```
 */
export function createState<T>(
	init: T,
	meta?: StateMeta
): [value: T, set: SetState<T>, onChange: OnStateChange<T>, reset: ResetState] {
	const handlers: StateChangeHandler<T>[] = []
	let value = Object.freeze(init)
	const log = meta?.logger ?? getDefaultLogger()

	function notifyAfterSet(old: T, value: T) {
		log.planck('state changed:', old, value)
		handlers.forEach(h => {
			h(value, old)
		})
		return value
	}

	function set(
		newValue: T | ((draft: T) => T | void | typeof nothing) | ((draft: T) => Promise<T | void | typeof nothing>)
	) {
		if (Object.is(value, newValue)) return newValue

		const old = value
		if (typeof init === 'function' || typeof newValue !== 'function') {
			value = Object.freeze(newValue as T)
		} else {
			let p: Promise<T | void> | undefined
			const r = produce(old, draft => {
				const x = (newValue as any)(draft)
				if (isPromise(x)) p = x
				else return x
			})
			if (p) {
				return p.then(v => {
					if (v === nothing) {
						return notifyAfterSet(old, undefined as any)
					}
					value = Object.freeze(v ?? r)
					return notifyAfterSet(old, value)
				})
			}
			value = Object.freeze(r)
		}
		return notifyAfterSet(old, value)
	}

	function onChange(handler: StateChangeHandler<T>) {
		if (handlers.includes(handler)) return () => {}
		log.on(logLevels.trace, log => log(`new onChange handler: ${tersify(handler)}`))
		handlers.push(handler)
		return () => {
			handlers.splice(handlers.indexOf(handler), 1)
		}
	}

	function reset() {
		set(init)
	}

	return [value, set as any, onChange, reset]
}
