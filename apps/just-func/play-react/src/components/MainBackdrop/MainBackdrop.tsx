import { formatKeyBinding } from '@just-web/app'
import { useStore } from '@just-web/react'
import { getStore, getStoreValue } from '../../store'
import logo from './logo.svg'
import styles from './MainBackdrop.module.scss'

const MainBackdrop = () => {
  console.info('backdrop render')
  const s = getStoreValue()
  const keyBindings = s.app.contributions.keyBindings.list()
  const showCommandPalette = keyBindings.find(k => k.command === 'just-web.showCommandPalette')

  const store = getStore()
  const [value, setValue] = useStore(store, s => s.counter, s => { s.counter = value })

  return <div className={styles.main_backdrop}>
    <div>Value: {String(value)}</div>
    <button onClick={() => setValue(value + 1)}>Toggle</button>
    <button onClick={() => getStore().update(s => { s.counter++ })}>Update Store</button>
    <img src={logo} className={styles.logo} alt="logo" />
    <p>
      Press <code>{formatKeyBinding(showCommandPalette!).key}</code> to open command palette.
    </p>
    <a
      className={styles.app_link}
      href="https://reactjs.org"
      target="help"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </div>
}

export default MainBackdrop
