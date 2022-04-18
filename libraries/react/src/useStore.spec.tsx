import { createStore } from '@just-web/app'
import { useEffect } from 'react'
import renderer, { act, ReactTestRendererJSON } from 'react-test-renderer'
import { useStore } from '.'


test("state value updates as store updates", () => {
  const store = createStore({ counter: 0 })

  const Counter = () => {
    const [value] = useStore(store, s => s.counter)
    return <div>{value}</div>
  }

  const c = renderer.create(<Counter />)

  let tree = c.toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div>
      0
    </div>
  `)

  act(() => store.update(s => { s.counter++ }))

  tree = c.toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div>
      1
    </div>
  `)
})

test('specify update function', () => {
  const store = createStore({ counter: 0 })

  const Counter = () => {
    const [value, setValue] = useStore(store, s => s.counter, s => { s.counter = value })

    return (
      <>
        <div>{value}</div>
        <button onClick={() => setValue(v => v + 1)} />
      </>
    )
  }

  const c = renderer.create(<Counter />)
  let tree = c.toJSON() as ReactTestRendererJSON[]
  act(() => tree[1].props.onClick())

  expect(store.get().counter).toBe(1)
})

test("useEffect to update store", () => {
  const store = createStore({ counter: 0 })

  const Counter = () => {
    const [value, setValue] = useStore(store, s => s.counter)

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

  const c = renderer.create(<Counter />)
  let tree = c.toJSON() as ReactTestRendererJSON[]
  act(() => tree[1].props.onClick())

  expect(store.get().counter).toBe(1)
})
