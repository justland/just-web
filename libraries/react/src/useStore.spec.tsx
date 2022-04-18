import { createStore, createTestApp, logLevels, MemoryLogReporter } from '@just-web/app'
import { useEffect } from 'react'
import renderer, { act, ReactTestRendererJSON } from 'react-test-renderer'
import { useStore } from '.'

let reporter: MemoryLogReporter
beforeEach(() => reporter = createTestApp({ log: { logLevel: logLevels.all } }).log.reporter)

test('state value updates as store updates', async () => {
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

  await act(() => store.update(s => { s.counter++ }))

  tree = c.toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div>
      1
    </div>
  `)
})

test('specify update function', async () => {
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
  const tree = c.toJSON() as ReactTestRendererJSON[]
  await act(() => tree[1].props.onClick())

  expect(store.get().counter).toBe(1)
})

test('useEffect to update store', async () => {
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
  const tree = c.toJSON() as ReactTestRendererJSON[]
  await act(() => tree[1].props.onClick())

  expect(store.get().counter).toBe(1)
})

test('onChange handler called once per change', async () => {
  const store = createStore({ counter: 0 })

  const Counter = () => {
    const [value] = useStore(store, s => s.counter)

    return (
      <>
        <div>{value}</div>
      </>
    )
  }

  renderer.create(<Counter />)
  await act(() => store.update(s => { s.counter++ }))
  await act(() => store.update(s => { s.counter++ }))
  await act(() => store.update(s => { s.counter++ }))
  await act(() => store.update(s => { s.counter++ }))
  await act(() => store.update(s => { s.counter++ }))

  const count = reporter.getLogMessageWithLevel().split('\n')
    .filter(m => m === `(PLANCK) useStore: onChange triggered`).length
  expect(count).toBe(5)
})
