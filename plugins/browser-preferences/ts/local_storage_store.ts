import type { LogGizmo } from '@just-web/log'
import { isNothing, nothing } from '@just-web/states'
import { decode, encode } from 'js-base64'
import { ctx } from './local_storage_store.ctx.js'

export function getKey(id: string, key: string) {
	return `${id}:${key}`
}

/**
 * @param k resolved key
 */
export function getItem(k: string) {
	return deserialize(ctx.getLocalStorage().getItem(k))
}

export function serialize(value: string) {
	return encode(value)
}

export function deserialize(value: string | null) {
	return value === null ? undefined : decode(value)
}

export function setHandler(
	{ log }: LogGizmo,
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
