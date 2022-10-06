import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard'
import { osTestPlugin } from '@just-web/os'
import { render, screen } from '@testing-library/react'
import App from './App'
import { createAppStore } from './store'

test('renders learn react link', async () => {
  const app = createTestApp()
    .extend(osTestPlugin())
    .extend(keyboardPlugin())
    .extend(commandsPlugin())
  createAppStore(app as any)
  await app.start()
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
