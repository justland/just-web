import type { LogGizmo } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyBindingContribution, KeyboardGizmo } from '@just-web/keyboard'
import type { OSGizmo } from '@just-web/os'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'

let keys: Record<string, boolean>
export function startKeyBindings(param: LogGizmo & KeyboardGizmo & CommandsGizmo& OSGizmo) {
	const keyBindings = param.keyboard.keyBindingContributions

	keys = record()

	keyBindings.values().forEach(keybinding => bindKey(param, keybinding))
	keyBindings.onChange(value => {
		Mousetrap.reset()
		keys = record()
		// @todo: use `immer` patch support to only update the delta
		forEachKey(value, name => bindKey(param, value[name]!))
	})
}

function bindKey(
	{ log: logContext, commands, os }: LogGizmo&CommandsGizmo&OSGizmo,
	keyBinding: KeyBindingContribution
) {
	const key = getKey({ os }, keyBinding)
	if (key) {
		const log = logContext.getLogger('@just-web/browser-keyboard')
		if (keys[key]) {
			log.warn(`Registering a duplicate key binding, ignored: ${keyBinding.id} - ${key}`)
		} else {
			keys[key] = true
			log.trace(`binding: ${key} -> ${keyBinding.id}`)
			Mousetrap.bind(toMousetrapKey(key), e => {
				log.trace(`trigger ${key}`)
				if (e.preventDefault) e.preventDefault()
				commands.handlers.invoke(keyBinding.id)
				return false
			})
		}
	}
}

function getKey(ctx: OSGizmo, keyBinding: any): string {
	if (ctx.os.isMac()) return (keyBinding.mac ?? keyBinding.key) as string
	return keyBinding.key as string
}

function toMousetrapKey(key: string) {
	return key.replace(/cmd\+/, 'command+')
}
