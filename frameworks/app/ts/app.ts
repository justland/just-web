import { registerRoute } from '@just-web/routes'
import { BrowserError, JustWebError } from '@just-web/errors'
import { start } from './start'

export const app = {
  errors: { BrowserError, JustWebError },
  routes: { registerRoute },
  start
}
