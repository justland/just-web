import { Store } from '@just-web/states'
import { createContext, useContext } from 'react'
import { useStore } from './useStore'

export function createStoreContext<T>() {
  return createContext<Store<T>>(undefined as any)
}

export function useStoreContext<S, V>(
  reactContext: React.Context<Store<S>>,
  getState: (s: S) => V,
  updateStore?: (draft: S, value: V) => void | S
): [value: V, setValue: (value: V | ((value: V) => V)) => void] {
  return useStore(useContext(reactContext), getState, updateStore)
}
