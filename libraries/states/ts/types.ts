import { Draft, nothing } from 'immer'

/**
 * Updater for type `T`.
 *
 * If the function does not return,
 * the value is assumed to be updated in-place
 */
export type Updater<T> = (draft: Draft<T>) => undefined extends T ? Exclude<T, undefined> | void | typeof nothing : T | void

/**
 * Async updator for type `T`.
 *
 * If the resulting promise does not resolve to a value,
 * the value is assumed to be updated in-place.
 */
export type AsyncUpdater<T> = (draft: Draft<T>) => Promise<ReturnType<Updater<T>>>
