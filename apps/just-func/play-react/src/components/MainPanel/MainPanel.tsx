import { Tab } from '@headlessui/react'
import { getLogger } from '@just-web/app'
import { useStore } from '@just-web/react'
import { getStore } from '../../store'


const log = getLogger('MainPanel')

const MainPanel = () => {
  log.trace('render')
  const [count] = useStore(getStore(), s => s.documents.length)

  return <Tab.Group>
    <Tab.List>
      <Tab>{count}</Tab>
    </Tab.List>
  </Tab.Group>
}

export default MainPanel
