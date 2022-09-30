import { IsoError, ModuleError } from 'iso-error'

export class JustWebAppError extends ModuleError {
  constructor(message: string, options?: IsoError.Options) {
    super('@just-web/app', message, options)
  }
}
