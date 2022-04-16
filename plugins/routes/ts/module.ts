import { Context } from '@just-web/contexts'
import { setStore } from './store'
import * as routes from './routes'
import { log } from './log'

export interface RoutesContext {
  routes: typeof routes
}

export async function activate(context: Context): Promise<RoutesContext> {
  setStore(context)
  return { routes }
}

export interface RoutesStartOptions {
  /**
   * The initial route. Default to `/`
   */
  initialRoute: string
}

const defaultStartOptions: RoutesStartOptions = {
  initialRoute: '/'
}

export async function start(options = defaultStartOptions) {
  return Promise.resolve().then(() => {
    log.info('nav?')
    routes.navigate(options.initialRoute)
  })
}
