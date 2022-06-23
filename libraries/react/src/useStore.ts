/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getLogger, Store, suppressLogs } from '@just-web/app'
import { MD5 } from 'object-hash'
import { useLayoutEffect, useState } from 'react'
import { AnyFunction, record } from 'type-plus'

interface ChangeSource {
  initialized?: boolean,
  fromStore?: boolean,
  fromState?: boolean
}

const map = new Map<Store<any>, Record<string, ChangeSource>>()

function getChangeSource(store: Store<any>, getState: AnyFunction, updateStore: AnyFunction | undefined) {
  if (!map.has(store)) {
    map.set(store, record())
  }
  const m = map.get(store)!
  const key = [getState, updateStore ?? null].map(MD5).join()
  if (m[key]) return m[key]
  return m[key] = record()
}

/**
 * Use a value in the store for `useState()`.
 * @param getState a function to get the value to be used in `useState()`.
 * @param updateStore optional function to update the store value when the state changes.
 * This is the same as calling `setValue()` by yourself.
 */
export function useStore<S, V>(
  store: Store<S>,
  getState: (s: S) => V,
  updateStore?: (draft: S, value: V) => void | S)
  : [value: V, setValue: (value: V | ((value: V) => V)) => void] {
  const shared: ChangeSource = getChangeSource(store, getState, updateStore)

  const [value, setValue] = useState(getState(store.get()))
  useLayoutEffect(() => {
    const stateLog = getLogger('@just-web/states/state')
    return suppressLogs(() => store.onChange(s => {
      if (shared.fromState) return void (shared.fromState = false)

      const newValue = getState(s)
      if (Object.is(newValue, value)) return
      shared.fromStore = true
      setValue(newValue)
    }), stateLog)
  }, [value])

  useLayoutEffect(() => {
    if (!shared.initialized) {
      shared.initialized = true
      return
    }
    if (shared.fromStore) return void (shared.fromStore = false)

    if (updateStore) {
      shared.fromState = true
      store.update(s => updateStore(s, value))
    }
  }, [value])

  return [value, setValue]
}
