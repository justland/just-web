import { IsoError, ModuleError } from 'iso-error'

export class JustWebError extends ModuleError {
  constructor(message: string, options?: IsoError.Options) {
    super('@just-web/errors', message, options)
  }
}

export class BrowserError extends JustWebError {
  constructor(event: string | Event,
    public source?: string,
    public lineno?: number,
    public colno?: number,
    error?: Error) {
    super(event.toString(), { cause: error })

  }
}
