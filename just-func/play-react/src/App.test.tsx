import { render, screen } from '@testing-library/react'
import { activate } from '@just-web/react-commands'
import { create } from '@just-web/contexts'
import App from './App'

test('renders learn react link', () => {
  // This is temporary. the `app` should do this instead
  activate(create())
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
