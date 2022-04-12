import { createContext } from '@just-web/contexts'
import { activate } from '@just-web/react-commands'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  // This is temporary. the `app` should do this instead
  activate(createContext())
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
