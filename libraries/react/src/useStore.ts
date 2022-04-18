import { Store } from '@just-web/app'
import { useEffect, useState } from 'react'

/**
 * Use a value in the store for `useState()`.
 *
 * @param getValue a function to get the value to be used in `useState()`.
 */
export function useStore<S, V>(
  store: Store<S>,
  getValue: (s: S) => V,
  updateValue?: (draft: S) => void | S)
  : [value: V, setvalue: (v: V | ((v: V) => V)) => void] {
  const [value, setValue] = useState(getValue(store.get()))
  store.onChange(s => setValue(getValue(s)))
  if (updateValue) {
    useEffect(() => store.update(updateValue), [value])
  }
  return [value, setValue]
}
