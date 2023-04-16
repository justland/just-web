import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import { keyBindingRegistry, type KeyBindingContributionRegistry } from './keyBindings.js'

export type KeyboardGizmoOptions = {
	keyBindingContributions?: keyBindingRegistry.Options
}

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

export type KeyboardGizmo = define.Infer<typeof keyboardGizmoFn>
