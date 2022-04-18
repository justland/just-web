import { lazy, Suspense } from 'react'
import './App.css'
import MainBackdrop from './components/MainBackdrop/MainBackdrop'
import { getStoreValue } from './store'
// import Editor from './components/Editor/Editor'

const CommandPalette = lazy(async () => {
  const reactCommandsModule = await import('@just-web/react-commands')
  const { app } = getStoreValue()
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
    <main className="App-main">
      <MainBackdrop />
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
