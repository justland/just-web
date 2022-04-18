import { createStore, Store } from '@just-web/app'
import { useEffect, VFC } from 'react'
import { useStore } from './useStore'


const UseStore: VFC<{ store: Store<{ counter: number }> }> = ({ store }) => {
  const [value, setValue] = useStore(store, s => s.counter, s => { s.counter = value })
  return <>
    <div>{value}</div>
    <div>{store.get().counter} - this will lack behind when using setValue, expected</div>
    <button onClick={() => setValue(value + 1)}>Invoke setValue</button>
    <button onClick={() => store.update(s => { s.counter++ })}>Invoke store.update</button>
  </>
}

const UseEffect: VFC<{ store: Store<{ counter: number }> }> = ({ store }) => {
  const [value, setValue] = useStore(store, s => s.counter)
  useEffect(() => store.update(s => { s.counter = value }), [store, value])
  return <>
    <div>{value}</div>
    <div>{store.get().counter} - this will lack behind when using setValue, expected</div>
    <button onClick={() => setValue(value + 1)}>Invoke setValue</button>
    <button onClick={() => store.update(s => { s.counter++ })}>Invoke store.update</button>
  </>
}

export default {
  component: UseStore
}

export const BasicUsage = () => <UseStore store={createStore({ counter: 0 })} />

export const UseEffectExplicitly = () => <UseEffect store={createStore({ counter: 0 })} />
