import { command } from '@just-web/commands'

export const setLanguageCommand = command<(newLanguage: string) => void>({
	id: '@just-web/i18n/set-language',
	title: `Set locale language`
})
