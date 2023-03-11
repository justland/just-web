import type { CommandsContext } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { isNothing, nothing } from '@just-web/states'
import { AppBaseContext, definePlugin } from '@just-web/types'
import { produce } from 'immer'
import { decode, encode } from 'js-base64'
import { MaybePromise } from 'type-plus'
import { ctx } from './browserPreferences.ctx.js'

const browserPreferencesPlugin = definePlugin(() => ({
	name: '@just-web/browser-preferences',
	init({
		name,
		commands,
		keyboard,
		log
	}: AppBaseContext & LogContext & CommandsContext & Partial<KeyboardContext>) {
		getUserPreference.connect({ commands, keyboard }, (key, defaultValue) => {
			const k = getKey(name, key)
			log.planck(`get: '${k}'`)
			return getItem(k) ?? defaultValue
		})
		setUserPreference.connect({ commands, keyboard }, async (key, value) => {
			const k = getKey(name, key)
			const original = getItem(k)
			const v = typeof value === 'function' ? produce(original, value as any) : value
			MaybePromise.transform(v, v => setHandler({ log }, k, original, v))
		})
		clearAllUserPreferences.connect({ commands, keyboard }, () => {
			log.notice(`clear all: '${name}'`)
			const keys: string[] = []
			const localStorage = ctx.getLocalStorage()
			// have to iterate and get all keys first.
			// removing item mid-loop screw up key index.
			for (let i = 0; i < localStorage.length; i++) {
				keys.push(localStorage.key(i)!)
			}
			keys
				.filter(k => k.startsWith(`${name}:`))
				.forEach(k => {
					log.trace(`clear all: clear '${k}'`)
					localStorage.removeItem(k)
				})
		})
	}
}))

export default browserPreferencesPlugin

function getKey(id: string, key: string) {
	return `${id}:${key}`
}

/**
 * @param k resolved key
 */
function getItem(k: string) {
	return deserialize(ctx.getLocalStorage().getItem(k))
}

function serialize(value: string) {
	return encode(value)
}

function deserialize(value: string | null) {
	return value === null ? undefined : decode(value)
}

function setHandler(
	{ log }: LogContext,
	k: string,
	original: string | undefined,
	v: string | undefined | typeof nothing
) {
	const localStorage = ctx.getLocalStorage()
	if (isNothing(v) || v === undefined) {
		log.trace(`set: clear '${k}'`)
		localStorage.removeItem(k)
	} else {
		log.trace(`set: '${k}' ${original} -> ${v}`)
		localStorage.setItem(k, serialize(v))
	}
}
