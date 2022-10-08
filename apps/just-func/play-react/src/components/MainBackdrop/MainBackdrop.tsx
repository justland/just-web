import { showCommandPalette } from '@just-web/commands'
import { formatKeyBinding } from '@just-web/keyboard'
import { getLogger } from '@just-web/log'
import { getStoreValue } from '../../store'
import logo from './logo.svg'

const log = getLogger('MainBackdrop')

const MainBackdrop = () => {
  log.trace('render')
  const s = getStoreValue()
  const keyBindings = s.app.keyboard.keyBindingContributions.list()
  const kb = keyBindings.find(k => k.id === showCommandPalette.id)!

  return <div className="flex flex-col text-center items-center justify-center text-4xl">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Press <code>{formatKeyBinding(s.app, kb).key}</code> to open command palette.
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
