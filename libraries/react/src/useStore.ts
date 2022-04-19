import { getLogger, Store, suppressLogs, tersify } from '@just-web/app'
import { useCallback, useEffect, useState } from 'react'

const log = getLogger('@just-web/react/useStore')

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
  const stateLog = getLogger('@just-web/states/state')

  // tersify `getValue` ahead of time so don't need to do `tersify` on every change
  const tersifiedGetValue = tersify(getValue)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  suppressLogs(() => store.onChange(useCallback(s => {
    const newValue = getValue(s)
    log.planck(`onChange triggered for: ${tersifiedGetValue}`)
    setValue(newValue)
  }, [])), stateLog)

  useEffect(() => updateValue && store.update(updateValue), [value])
  return [value, setValue]
}
