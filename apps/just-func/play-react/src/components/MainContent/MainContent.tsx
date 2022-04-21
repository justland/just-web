import { Tab } from '@headlessui/react'
import { getLogger } from '@just-web/app'
import { useStore } from '@just-web/react'
import { getStore } from '../../store'

const log = getLogger('MainContent')

const MainContent = () => {
  log.trace('render')
  const [filenames] = useStore(getStore(), s => s.openedFilenames)

  return <Tab.Group>
    <Tab.List className="bg-zinc-600">
      {filenames.map(filename => <Tab
        className="bg-zinc-800 py-1 px-5 mx-px mt-px border-zinc-800 border-x-2 border-t-2 rounded-t-md"
      >{filename}</Tab>)}
    </Tab.List>
  </Tab.Group>
}

export default MainContent
