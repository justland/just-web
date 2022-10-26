import { Store } from '@just-web/states'
import { Context, createContext, useContext } from 'react'
import { useStore } from './useStore'

/**
 * Creates a `Store<T>`context to be used in `useStoreContext()`
 * @type T Type of the store value.
 */
export function createStoreContext<T>() {
  return createContext<Store<T>>(undefined as any)
}

/**
 * Uses a store context.
 * @param reactContext The context created from `createStoreContext()`.
 * @param getState The function to get a particular value from the store.
 * @param updateStore Optional. The function to update the store when the returning `setValue()` is called.
 */
export function useStoreContext<S, V>(
  reactContext: Context<Store<S>>,
  getState: (s: S) => V,
  updateStore?: (draft: S, value: V) => void | S
): [value: V, setValue: (value: V | ((value: V) => V)) => void] {
  const store = useContext(reactContext)
  if (!store) {
    throw new Error('Context.Provider must be used before using useStoreContext()')
  }
  return useStore(store, getState, updateStore)
}
