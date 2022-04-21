import { formatKeyBinding, getLogger } from '@just-web/app'
import { getStoreValue } from '../../store'
import logo from './logo.svg'

const log = getLogger('MainBackdrop')

const MainBackdrop = () => {
  log.trace('render')
  const s = getStoreValue()
  const keyBindings = s.app.contributions.keyBindings.list()
  const showCommandPalette = keyBindings.find(k => k.command === 'just-web.showCommandPalette')

  return <div className="flex flex-col text-center items-center justify-center text-4xl">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Press <code>{formatKeyBinding(showCommandPalette!).key}</code> to open command palette.
    </p>
    <a
      className="text-blue-300"
      href="https://reactjs.org"
      target="help"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </div>
}

export default MainBackdrop
