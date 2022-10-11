import { createStore, Store } from '@just-web/states'
import { FC, useEffect, useState, VFC } from 'react'
import { useStore } from './useStore'

const UseStore: FC<{ name?: string, store: Store<{ counter: number }> }> = ({ name = 'UseStore', store, children }) => {
  const [value, setValue] = useStore(store, s => s.counter, (s, v) => {
    console.info(`${name} useStore.update`, s.counter, v)
    s.counter = v
  })

  console.count(`${name} render`)
  return <>
    <div>{name} state value: {value}</div>
    <div>{name} store value: {store.get().counter}</div>
    <button onClick={() => setValue(v => {
      console.info(`${name} onClick.setValue`, v, v + 1)
      return v + 1
    })}>{name} setValue</button>
    <button onClick={() => {
      console.info(`${name} onClick.store.update`)
      store.update(s => { s.counter++ })
    }}>{name} store.update</button>
    {children}
  </>
}

const UseEffect: VFC<{ store: Store<{ counter: number }> }> = ({ store }) => {
  const [value, setValue] = useStore(store, s => s.counter)
  useEffect(() => store.update(s => {
    console.info('useEffect store.update:', s.counter, value)
    s.counter = value
  }), [value])

  console.count('render')
  return <>
    <div>state value: {value}</div>
    <div>store value: {store.get().counter} This value is lack behind by one when using `setValue`, because change occurs within `useEffect()` and the store value is not tracked by React</div>
    <button onClick={() => setValue(v => v + 1)}>Invoke setValue</button>
    <button onClick={() => store.update(s => { s.counter++ })}>Invoke store.update</button>
  </>
}

export default {
  component: UseStore
}

export const BasicUsage = () => <UseStore store={createStore({ counter: 0 })} />


export const UseEffectExplicitly = () => <UseEffect store={createStore({ counter: 0 })} />

const Child = ({ store }: { store: Store<{ counter: number }> }) => {
  const [value, setValue] = useStore(store, s => s.counter, (s, v) => {
    s.counter = v
  })
  console.count('re-render child')

  return (<>
    <div>child.value: {value}</div>
    <div>child.store: {store.get().counter}</div>
    <button onClick={() => setValue(v => {
      console.info('child.setValue', v, '->', v + 1)
      return v + 1
    })}>child increment</button>
  </>)
}
const Parent = ({ store }: { store: Store<{ counter: number }> }) => {
  const [value, setValue] = useStore(store, s => s.counter, (s, v) => {
    s.counter = v
  })
  console.count('re-render parent')

  const [timer, setTimer] = useState(false)
  const [timerId, setTimerId] = useState<any>()
  useEffect(() => {
    if (timer) {
      setTimerId(setInterval(() => store.update(s => { s.counter = s.counter + 1 }), 1000))
    }
    else {
      clearInterval(timerId)
    }
    return () => clearInterval(timerId)
  }, [timer])

  return (<>
    <button onClick={() => setTimer(v => !v)} >{timer ? 'stop store update' : 'start store update'}</button>
    <div>parent.value: {value}</div>
    <div>parent.store: {store.get().counter}</div>
    <button onClick={() => setValue(v => {
      console.info('parent.setValue', v, '->', v + 1)
      return v + 1
    })}>parent increment</button>
    <Child store={store} />
  </>)
}

export const ParentChild_1 = () => {
  return <Parent store={createStore({ counter: 0 })} />
}
const ToggleStoreUpdate = ({ store }: { store: Store<{ counter: number }> }) => {
  const [timer, setTimer] = useState(false)
  // const [timerId, setTimerId] = useState<any>()
  useEffect(() => {
    if (timer) {
      const id = setInterval(() => store.update(s => {
        console.info(`timer store.update:`, s.counter, s.counter + 1)
        s.counter = s.counter + 1
      }), 1000)
      return () => clearInterval(id)
    }
  }, [timer])
  return <div>
    <button onClick={() => setTimer(v => !v)} >{timer ? 'stop store update' : 'start store update'}</button>
  </div>
}
export const ParentChild_2 = () => {
  const store = createStore({ counter: 0 })
  return <>
    <UseStore name='parent' store={store}>
      <UseStore name='child' store={store} />
    </UseStore>
    <ToggleStoreUpdate store={store} />
  </>
}

export const StoreChangeTriggerRender = () => {
  const store = createStore({ counter: 0 })
  const values: number[] = []
  const Counter = () => {
    const [value] = useStore(store, s => s.counter)
    values.push(value)
    return (
      <>
        <div>{value}</div>
        <div id='values'>{values}</div>
      </>
    )
  }

  useEffect(() => {
    const id = setInterval(() => store.update((s) => { s.counter++ }), 300)
    return () => clearInterval(id)
  }, [])
  return <Counter />
}
