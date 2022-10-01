import { ModuleError } from 'iso-error'

export class JustWebAppError extends ModuleError {
  constructor(message: string, options?: ModuleError.Options) {
    super('@just-web/app', message, options)
  }
}
