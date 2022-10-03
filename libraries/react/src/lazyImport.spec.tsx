import { createTestApp } from '@just-web/app'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import delay from 'delay'
import { Suspense } from 'react'
import { lazyImport } from './lazyImport'
import isCI from 'is-ci'

test('lazy import module', async () => {
  const app = createTestApp({ name: 'test' })

  const Component = lazyImport(
    () => app,
    () => import('./dummyModule'),
    m => m.Component)

  render(<Suspense fallback={<div>loading...</div>}>
    <Component />
  </Suspense>)

  if (isCI) await delay(2000)
  expect(await screen.findByText('dummy')).toBeInTheDocument()
})
