import logo from './logo.svg'
import './App.css'
import { lazy, Suspense } from 'react'
import { getStore } from './store'
// import Editor from './components/Editor/Editor'

const CommandPalette = lazy(async () => {
  const reactCommandsModule = await import('@just-web/react-commands')
  const { app } = getStore().get()
  await app.addPlugin(reactCommandsModule)

  // app.contributions.commands.add({
  //   command: 'app.new'
  // })
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
      {/* <Editor /> */}
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
