import logo from './logo.svg'
import './App.css'
import { lazy, Suspense } from 'react'
import { getStore } from './store'

const CommandPalette = lazy(async () => {
  console.info('loading')
  const reactCommandsModule = await import('@just-web/react-commands')
  const s = getStore().get()
  await s.app.addPlugin(reactCommandsModule)
  return {
    default: reactCommandsModule.CommandPalette
  }
})

function App() {
  return (<>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Press <code>ctrl+p</code> to open command palette.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
