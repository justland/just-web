import { createApp } from '@just-web/app'
import { LogContext } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { AppContext, useAppContext } from './AppContext'

export default {}

export const ValueMustBeApp = () => {
  const app = createApp({ name: 'app' })
  return <AppContext.Provider value={app} />
}

const LogChild = () => {
  const c = useAppContext<LogContext>()
  return <div>Keys in log: {Object.keys(c.log).join(', ')}</div>
}

export const GetContext = () => {
  const app = createApp({ name: 'app' })
  return <AppContext.Provider value={app}>
    <LogChild />
  </AppContext.Provider>
}

export const MissingProvider = () => <LogChild />

const DefaultType = () => {
  const c = useAppContext()
  return <div>
    <p>App name: {c.name}</p>
    <p>App id: {c.id}</p>
    <p>has log context: {c.log ? 'true' : 'false'}</p>
  </div>
}

export const DefaultTypeToAppBaseContext = () => {
  const app = createApp({ name: 'app' })
  return <AppContext.Provider value={app}>
    <DefaultType />
  </AppContext.Provider>
}

const CustomType = () => {
  const c = useAppContext<OSContext>()
  return <div>
    <p>App name: {c.name}</p>
    <p>App id: {c.id}</p>
    <p>has os context: {c.os ? 'true' : 'false'}</p>
  </div>
}

export const CustomContext = () => {
  const app = createApp({ name: 'app' }).extend(osPlugin())
  return <AppContext.Provider value={app}>
    <CustomType />
  </AppContext.Provider>
}
