import { registerRoute } from '@just-web/routes'
import { BrowserError, JustWebError } from '@just-web/errors'
import { start } from './start'
import * as states from '@just-web/states'
export const app = {
  errors: { BrowserError, JustWebError },
  routes: { registerRoute },
  states,
  start
}
