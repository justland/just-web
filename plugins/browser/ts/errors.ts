import { ModuleError } from 'iso-error'

export class JustWebBrowserError extends ModuleError {
  constructor(message: string, options?: ModuleError.Options) {
    super('@just-web/browser', message, options)
  }
}

export class BrowserError extends JustWebBrowserError {
  constructor(event: string | Event,
    public source?: string,
    public lineno?: number,
    public colno?: number,
    error?: Error) {
    super(event.toString(), { cause: error })
  }
}
