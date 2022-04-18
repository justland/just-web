import { useStore } from '@just-web/react'
import { lazy, Suspense } from 'react'
import './App.css'
import MainBackdrop from './components/MainBackdrop/MainBackdrop'
import MainPanel from './components/MainPanel/MainPanel'
import { getStore, getStoreValue } from './store'

const CommandPalette = lazy(async () => {
  const reactCommandsModule = await import('@just-web/react-commands')
  const { app } = getStoreValue()
  await app.addPlugin(reactCommandsModule)

  return {
    default: reactCommandsModule.CommandPalette
  }
})
function App() {
  const store = getStore()
  const [hasDoc] = useStore(store, s => s.documents.length !== 0)

  return (<>
    <main className="App-main">
      {hasDoc ? <MainPanel /> : <MainBackdrop />}
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
