import '@testing-library/jest-dom'
import { createTestApp } from '@just-web/app'
import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { lazyImport } from './lazyImport'

test('lazy import module', async () => {
  const app = createTestApp()
  const Component = lazyImport(
    () => app,
    () => import('./dummyModule'),
    m => m.Component)

  render(<Suspense fallback={<div>loading...</div>}>
    <Component />
  </Suspense>)

  expect(await screen.findByText('dummy')).toBeInTheDocument()
})
