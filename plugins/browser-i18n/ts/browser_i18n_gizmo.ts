import { define, type IdGizmo, incubate } from '@just-web/app'
import type { BrowserGizmo } from '@just-web/browser'
import type { CommandsGizmo } from '@just-web/commands'
import { i18nGizmoFn } from '@just-web/i18n'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { ctx } from './browser_i18n_gizmo.ctx.js'

/**
 * Creates a i18n gizmo for browser.
 */
export const browserI18nGizmo = define({
	static: define.require<IdGizmo>().require<BrowserGizmo>().optional<CommandsGizmo & KeyboardGizmo>(),
	async create({ name, browser, commands, keyboard }) {
		const storageKey = ctx.getStorageKey(name)
		const language = browser.localStorage.getItem(storageKey) ?? browser.navigator.language

		const { i18n } = await incubate({ commands, keyboard }).with(i18nGizmoFn({ language })).create()

		i18n.languageChanged(newLanguage => {
			browser.localStorage.setItem(storageKey, newLanguage)
		})
		return {
			i18n: {
				...i18n,
				clearLanguage() {
					i18n.setLanguage(browser.navigator.language)
					browser.localStorage.removeItem(storageKey)
				}
			}
		}
	}
})

export type BrowserI18nGizmo = define.Infer<typeof browserI18nGizmo>
