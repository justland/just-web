import { Tab } from '@headlessui/react'
import { getLogger } from '@just-web/app'
import { useStore } from '@just-web/react'
import { store } from '../../docViews/store'

const log = getLogger('MainContent')

const MainContent = () => {
  log.trace('render')
  const [views] = useStore(store, s => s.views)

  return <Tab.Group>
    <Tab.List className="bg-zinc-600">
      {views.map(view => <Tab
        className="bg-zinc-800 py-1 px-5 mx-px mt-px border-zinc-800 border-x-2 border-t-2 rounded-t-md"
      >{view.doc.name}</Tab>)}
    </Tab.List>
  </Tab.Group>
}

export default MainContent
