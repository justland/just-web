import { Store } from '@just-web/states'
import { useCallback, useEffect, useState } from 'react'

/**
 * Use a value in the store for `useState()`.
 * @param getState a function to get the value to be used in `useState()`.
 * @param updateStore optional function to update the store value when the state changes
 */
export function useStore<S, V>(
  store: Store<S>,
  getState: (s: S) => V,
  updateStore?: (draft: S, value: V) => void | S)
  : [value: V, setValue: (value: V | ((value: V) => V)) => void] {
  const [value, setValue] = useState(() => getState(store.get()))

  useEffect(() => store.onChange(s => setValue(getState(s))), [])

  return [value, useCallback(updater => {
    if (updateStore) {
      store.update(s => updateStore(
        s,
        typeof updater === 'function' ? (updater as any)(getState(s)) : updater)
      )
      return setValue(getState(store.get()))
    }
    return setValue(updater)
  }, [])]
}
