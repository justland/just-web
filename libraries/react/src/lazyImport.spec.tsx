import { createTestApp } from '@just-web/app'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AssertOrder } from 'assertron'
import delay from 'delay'
import isCI from 'is-ci'
import { Suspense } from 'react'
import { lazyImport } from './lazyImport'

it('lazy imports module', async () => {
  const app = createTestApp({ name: 'test' })

  const { Component } = lazyImport(
    import('./dummyModule'),
    'Component',
    (plugin) => app.extend(plugin({ a: 1 }))
  )

  render(<Suspense fallback={<div>loading...</div>}>
    <Component />
  </Suspense>)

  if (isCI) await delay(2000)
  expect(await screen.findByText('dummy')).toBeInTheDocument()
})

it('returns a promise for the extended app', async () => {
  const app = createTestApp({ name: 'test' })

  const { Component, getExtendingApp } = lazyImport(
    import('./dummyModule'),
    'Component',
    (plugin) => app.extend(plugin({ a: 1 }))
  )

  const extApp = await getExtendingApp()
  expect(extApp.dummy).toEqual(1)


  render(<Suspense fallback={<div>loading...</div>}>
    <Component />
  </Suspense>)

  if (isCI) await delay(2000)
  expect(await screen.findByText('dummy')).toBeInTheDocument()
})

it('does not extend app twice from rendering Component and getting extended app', async () => {
  const app = createTestApp({ name: 'test' })
  const o = new AssertOrder(1)
  const { Component, getExtendingApp } = lazyImport(
    Promise.resolve({
      default: () => ({
        id: 'dummy-2',
        init() { o.once(1) }
      }),
      Component: () => <div>dummy</div>
    }),
    'Component',
    (plugin) => app.extend(plugin())
  )

  await getExtendingApp()


  render(<Suspense fallback={<div>loading...</div>}>
    <Component />
  </Suspense>)

  if (isCI) await delay(2000)
  expect(await screen.findByText('dummy')).toBeInTheDocument()
  o.end()
})
