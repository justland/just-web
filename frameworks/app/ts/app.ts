import '@just-web/commands'
import { createContext } from '@just-web/contexts'
import '@just-web/contributions'
import '@just-web/platform'
import '@just-web/states'
import { registerRoute } from '@just-web/routes'
import { start } from './start'

// TODO: configure context with basic settings
const context = createContext()

export const app = {
  ...context,
  routes: { registerRoute },
  start
}
