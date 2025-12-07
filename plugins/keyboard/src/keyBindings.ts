import type { LogGizmo } from '@just-web/app'
import type { OSGizmo } from '@just-web/os'
import { createRegistry, type Registry, type WithAdder, withAdder } from '@just-web/states'
import { record } from 'type-plus'

export type KeyBindingContribution =
	| {
			/**
			 * Id of the command to bind to.
			 */
			id: string
			/**
			 * Default key
			 */
			key?: string
			/**
			 * MacOS specific key
			 */
			mac?: string
	  }
	| {
			/**
			 * Id of the command to bind to.
			 */
			id: string
			/**
			 * MacOS specific key
			 */
			mac: string

			/**
			 * No default key
			 */
			key?: undefined
	  }

export interface KeyBindingContributionRegistry
	extends Registry<string, KeyBindingContribution>,
		WithAdder<KeyBindingContribution> {}

export namespace keyBindingRegistry {
	export type Options = Array<KeyBindingContribution>
}

export function keyBindingRegistry(
	ctx: LogGizmo,
	options?: keyBindingRegistry.Options
): KeyBindingContributionRegistry {
	return withAdder(createRegistry<string, KeyBindingContribution>(getInitRecord(options)), (r, kb) => {
		const key = kb.id
		const log = ctx.log.getLogger('@just-web/contributions')
		if (r[key]) return log.warn(`Registering a duplicate key binding contribution, ignored: ${key}`)
		r[key] = kb
	})
}

function getInitRecord(options?: keyBindingRegistry.Options) {
	return (options ?? []).reduce((p, c) => {
		p[c.id] = c
		return p
	}, record<string, KeyBindingContribution>())
}

export function formatKeyBinding({ os }: OSGizmo, keyBinding: KeyBindingContribution) {
	const m = os.isMac()
	return {
		id: keyBinding.id,
		key: (m ? (keyBinding.mac ?? keyBinding.key) : keyBinding.key) as string
	}
}
