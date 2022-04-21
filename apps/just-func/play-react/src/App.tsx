import { lazyImport, useStore } from '@just-web/react'
import { Suspense } from 'react'
import MainBackdrop from './components/MainBackdrop/MainBackdrop'
import MainContent from './components/MainContent/MainContent'
import { getStore, getStoreValue } from './store'

const CommandPalette = lazyImport(
  () => getStoreValue().app,
  () => import('@just-web/react-commands'),
  m => m.CommandPalette
)
function App() {
  const store = getStore()
  const [hasDoc] = useStore(store, s => s.docs.length !== 0)

  return (<>
    <main className="bg-zinc-800 min-h-screen text-white">
      {hasDoc ? <MainContent /> : <MainBackdrop />}
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
