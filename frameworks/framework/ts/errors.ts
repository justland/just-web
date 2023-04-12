import { ModuleError } from 'iso-error'

export class JustWebFrameworkError extends ModuleError {
	constructor(message: string, options?: ModuleError.Options) {
		super('@just-web/framework', message, options)
	}
}
