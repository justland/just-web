import { lazyImport, useStore } from '@just-web/react'
import { Suspense } from 'react'
import MainBackdrop from './components/MainBackdrop/MainBackdrop'
import MainContent from './components/MainContent/MainContent'
import { store } from './docViews/store'
import { getStoreValue } from './store'

const { CommandPalette } = lazyImport(
  import('@just-web/react-commands'),
  'CommandPalette',
  (plugin) => getStoreValue().app.extend(plugin()),
)
function App() {
  const [hasView] = useStore(store, s => s.views.length !== 0)

  return (<>
    <main className="bg-zinc-800 min-h-screen text-white">
      {hasView ? <MainContent /> : <MainBackdrop />}
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <CommandPalette />
    </Suspense>
  </>
  )
}

export default App
