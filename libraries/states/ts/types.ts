import { nothing, type Draft } from 'immer'

export type UpdaterResult<T> = undefined extends T ? Exclude<T, undefined> | void | typeof nothing : T | void

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
