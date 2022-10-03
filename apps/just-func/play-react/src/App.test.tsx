import { createTestApp } from '@just-web/app'
import contributionsPlugin from '@just-web/contributions'
import commandsPlugin from '@just-web/commands'
import { render, screen } from '@testing-library/react'
import App from './App'
import { createAppStore } from './store'

test('renders learn react link', async () => {
  const app = createTestApp()
    .extend(contributionsPlugin())
    .extend(commandsPlugin())
  createAppStore(app as any)
  await app.start()
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
