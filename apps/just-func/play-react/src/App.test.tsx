import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { osTestPlugin } from '@just-web/os'
import { render, screen } from '@testing-library/react'
import App from './App'
import { createAppStore } from './store'

test('renders learn react link', async () => {
  const app = createTestApp()
    .extend(osTestPlugin())
    .extend(contributionsPlugin())
    .extend(commandsPlugin())
  createAppStore(app as any)
  await app.start()
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
