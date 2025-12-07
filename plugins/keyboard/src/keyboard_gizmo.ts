import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import { type KeyBindingContributionRegistry, keyBindingRegistry } from './keyBindings.js'

export type KeyboardGizmoOptions = {
	keyBindingContributions?: keyBindingRegistry.Options
}

/**
 * Gizmo function to create a KeyboardGizmo.
 *
 * A KeyboardGizmo provides a key binding contribution registry.
 * Which you can use to register key bindings.
 *
 * @require LogGizmo
 *
 * @example
 * ```ts
 */
export const keyboardGizmoFn: (options?: KeyboardGizmoOptions | undefined) => GizmoStatic<
	DepBuilder<LogGizmo, unknown>,
	{
		keyboard: {
			keyBindingContributions: KeyBindingContributionRegistry
		}
	}
> = define((options?: KeyboardGizmoOptions) => ({
	static: define.require<LogGizmo>(),
	async create(ctx) {
		return {
			keyboard: {
				keyBindingContributions: keyBindingRegistry(ctx, options?.keyBindingContributions)
			}
		}
	}
}))

/**
 * A KeyboardGizmo provides a key binding contribution registry.
 * Which you can use to register key bindings.
 */
export type KeyboardGizmo = define.Infer<typeof keyboardGizmoFn>
