import { formatKeyBinding } from '@just-web/app'
import { getStoreValue } from '../../store'
import logo from './logo.svg'
import styles from './MainBackdrop.module.scss'

const MainBackdrop = () => {
  const s = getStoreValue()
  const keyBindings = s.app.contributions.keyBindings.list()
  const showCommandPalette = keyBindings.find(k => k.command === 'just-web.showCommandPalette')

  return <div className={styles.main_backdrop}>
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
