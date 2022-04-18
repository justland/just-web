import { getLogger, logLevels, Store } from '@just-web/app'
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
  log.trace(`for: ${getValue.toString()}`)
  const [value, setValue] = useState(getValue(store.get()))
  const stateLog = getLogger('@just-web/states/state')
  const origLevel = stateLog.level
  stateLog.level = logLevels.none
  store.onChange(useCallback(s => {
    const newValue = getValue(s)
    log.planck(`useStore: onChange triggered`)
    setValue(newValue)
  }, []))
  stateLog.level = origLevel

  useEffect(() => updateValue && store.update(updateValue), [value])
  return [value, setValue]
}
