import { navigate, registerRoute, validateRoutes } from '@just-web/routes'
import { start as startError } from '@just-web/errors'
import { required } from 'type-plus'
import { log } from './log'

const defaultCtx = {
  routes: { navigate, registerRoute }
}
export namespace start {
  export type Ctx = typeof defaultCtx
  export interface Options {
    errors: startError.Options
  }
}


export async function start(options?: start.Options, ctx?: start.Ctx) {
  const { routes } = required(defaultCtx, ctx)
  const { errors } = required({}, options)
  log.notice('application starts')
  startError(errors)

  // TODO: validate app to make sure it has the minimum implementation,
  // such as handling `/` and `/error`
  if (!await validateRoutes()) return
  routes.navigate('/')
}
