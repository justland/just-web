import { define } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { setLanguageCommand } from './commands.js'

export interface I18nGizmoOptions {
	/**
	 * The current language locale.
	 * This serves as the initial value.
	 */
	language: string
}

export const i18nGizmoFn = define((options: I18nGizmoOptions) => ({
	static: define.optional<CommandsGizmo & KeyboardGizmo>(),
	async create({ commands, keyboard }) {
		let language = options.language
		const handlers: Array<(newLanguage: string, oldLanguage: string) => void> = []
		const gizmo = {
			i18n: {
				getLanguage() {
					return language
				},
				setLanguage(newLanguage: string) {
					const oldLanguage = language
					language = newLanguage
					handlers.forEach(handler => {
						handler(newLanguage, oldLanguage)
					})
				},
				languageChanged(handler: (newLanguage: string, oldLanguage: string) => void) {
					handlers.push(handler)
				}
			}
		}
		if (commands) {
			setLanguageCommand.connect({ commands, keyboard })
			commands.handlers.register(setLanguageCommand.id, gizmo.i18n.setLanguage)
		}

		return gizmo
	}
}))

export type I18nGizmo = define.Infer<typeof i18nGizmoFn>
