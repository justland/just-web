import { createApp } from '@just-web/app'
import * as reactCommandsModule from '@just-web/react-commands'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', async () => {
  const app = await createApp().addPlugin(reactCommandsModule)
  await app.start()
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
