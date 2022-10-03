import { createStore } from '@just-web/states'
import { useEffect } from 'react'
import { act, create, ReactTestRendererJSON } from 'react-test-renderer'
import { useStore } from '.'

test('each change from store will trigger state update', async () => {
  const store = createStore({ counter: 0 })

  const values: number[] = []
  const Counter = () => {
    const [value] = useStore(store, s => s.counter)
    values.push(value)
    return (
      <>
        <div>{value}</div>
      </>
    )
  }

  create(<Counter />)

  const increment = (s: { counter: number }) => { s.counter++ }

  act(() => store.update(increment))
  act(() => store.update(increment))
  act(() => store.update(increment))
  act(() => store.update(increment))
  act(() => store.update(increment))

  expect(values).toEqual([0, 1, 2, 3, 4, 5])
})

test('specifying updateStore then setState will trigger store changes', async () => {
  const store = createStore({ counter: 0 })

  const values: number[] = []
  const storeValues: number[] = []
  store.onChange(s => storeValues.push(s.counter))

  const Counter = () => {
    const [value, setValue] = useStore(
      store,
      s => s.counter,
      s => { s.counter = value }
    )

    values.push(value)

    return (
      <>
        <div>{value}</div>
        <button onClick={() => setValue(v => v + 1)} />
      </>
    )
  }

  const c = create(<Counter />)
  const tree = c.toJSON() as ReactTestRendererJSON[]
  const btn = tree[1]
  const triggerClick = () => btn.props.onClick()

  act(triggerClick)
  act(triggerClick)
  act(triggerClick)
  act(triggerClick)

  expect(values).toEqual([0, 1, 2, 3, 4])
  expect(storeValues).toEqual([1, 2, 3, 4])
})

test('can update by using useEffect in the component', async () => {
  const store = createStore({ counter: 0 })

  const values: number[] = []
  const storeValues: number[] = []
  store.onChange(s => storeValues.push(s.counter))

  const Counter = () => {
    const [value, setValue] = useStore(store, s => s.counter)
    values.push(value)
    useEffect(
      () => store.update(s => { s.counter = value }),
      [value]
    )
    return (
      <>
        <div>{value}</div>
        <button onClick={() => setValue(v => v + 1)} />
      </>
    )
  }

  const c = create(<Counter />)
  const tree = c.toJSON() as ReactTestRendererJSON[]
  const btn = tree[1]
  const triggerClick = () => btn.props.onClick()

  act(triggerClick)
  act(triggerClick)
  act(triggerClick)
  act(triggerClick)

  expect(values).toEqual([0, 1, 2, 3, 4])
  expect(storeValues).toEqual([1, 2, 3, 4])
})

test('store change with same value will not trigger render', async () => {
  const store = createStore({ counter: 0 })

  const values: number[] = []
  const Counter = () => {
    const [value] = useStore(store, s => s.counter)
    values.push(value)
    return (
      <>
        <div>{value}</div>
      </>
    )
  }

  create(<Counter />)

  act(() => store.update(s => s))

  expect(values).toEqual([0])
})
