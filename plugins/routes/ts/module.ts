import { Context } from '@just-web/contexts'
import * as routes from './routes'
import { setStore } from './store'

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
  routes.navigate(options.initialRoute)
}
