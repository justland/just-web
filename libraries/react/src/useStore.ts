import { Store } from '@just-web/app'
import { useCallback, useEffect, useState } from 'react'
import { log } from './log'

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
  store.onChange(useCallback(s => {
    log.planck('useStore: onChange triggered')
    setValue(getValue(s))
  }, []))
  useEffect(() => updateValue && store.update(updateValue), [value])
  return [value, setValue]
}
