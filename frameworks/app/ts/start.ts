import * as errorsModule from '@just-web/errors'
import { navigate, registerRoute, validateRoutes } from '@just-web/routes'
import { required } from 'type-plus'
import { log } from './log'
const defaultCtx = {
  routes: { navigate, registerRoute }
}
export namespace start {
  export type Ctx = typeof defaultCtx
  export interface Options {
    errors?: errorsModule.ModuleOptions,
  }
}

export async function start(options?: start.Options, ctx?: start.Ctx) {
  const { routes } = required(defaultCtx, ctx)
  const { errors } = required({}, options)

  log.notice('application starts')
  errorsModule.create(errors)

  // TODO: validate app to make sure it has the minimum implementation,
  // such as handling `/` and `/error`
  if (!await validateRoutes()) return
  routes.navigate('/')
}
