import type { Draft } from './immer.js'

/**
 * Updater for type `T`.
 *
 * If the function does not return,
 * or the resulting promise does not resolve to a value,
 * the value is assumed to be updated in-place.
 *
 * If the function returns `nothing` or resolves to `nothing`,
 * the value will be cleared.
 */
export type Updater<T> = (draft: Draft<T>) => UpdaterResult<T> | Promise<UpdaterResult<T>>

/**
 * The result of an updater function.
 *
 * If the updater returns `nothing` or resolves to `nothing`,
 * the value will be cleared.
 *
 * If the updater returns a promise that resolves to `nothing`,
 * the value will be cleared.
 *
 * If the updater returns a promise that resolves to a value, the value will be set to the resolved value.
 *
 * The return type cannot narrow to `typeof nothing` due to the limitation of TypeScript.
 * Need to use `symbol` instead.
 */
export type UpdaterResult<T> = undefined extends T ? Exclude<T, undefined> | void | symbol : T | void
