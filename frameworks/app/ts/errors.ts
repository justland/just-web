import { ModuleError } from '@just-web/framework'

export class JustWebAppError extends ModuleError {
	constructor(message: string, options?: ModuleError.Options) {
		super('@just-web/app', message, options)
	}
}
