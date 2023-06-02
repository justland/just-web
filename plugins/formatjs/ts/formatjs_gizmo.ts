import { createIntl, type IntlCache, type IntlConfig } from '@formatjs/intl'
import { define } from '@just-web/app'

export interface FormatJSGizmoOptions<T = string> {
	config: IntlConfig<T>
	cache?: IntlCache
}

export const formatJSGizmoFn = define(<T = string>(options: FormatJSGizmoOptions<T>) => ({
	async create() {
		return {
			formatjs: {
				intl: createIntl(options.config, options.cache)
			}
		}
	}
}))

export type FormatJSGizmo = define.Infer<typeof formatJSGizmoFn>
