import { define, type DepBuilder, type GizmoStatic, type LogGizmo } from '@just-web/app'
import type { KeyboardGizmo } from '@just-web/keyboard'
import type { AnyFunction, ExtractFunction } from 'type-plus'
import { showCommandPalette } from './commands.js'
import { contributionRegistry } from './contributions.js'
import { handlerRegistry } from './handlers.js'
import type { CommandContribution, ContributionRegistry, HandlerRegistry } from './types.js'

export type CommandsGizmoOptions = {
	contributions?: Array<CommandContribution>
	handlers?: Record<string, AnyFunction>
}

/**
 * Gizmo function to create a CommandsGizmo.
 *
 * @require LogGizmo, KeyboardGizmo
 */
export const commandsGizmoFn: (options?: CommandsGizmoOptions) => GizmoStatic<
	DepBuilder<LogGizmo, KeyboardGizmo>,
	{
		commands: {
			contributions: ContributionRegistry
			handlers: HandlerRegistry
			showCommandPalette: () => void
		}
	}
> = define((options?: CommandsGizmoOptions) => ({
	static: define.require<LogGizmo>().optional<KeyboardGizmo>(),
	async create(ctx) {
		const contributions = contributionRegistry(ctx, options?.contributions)
		const handlers = handlerRegistry(ctx, options?.handlers)

		return {
			commands: {
				contributions,
				handlers,
				showCommandPalette: showCommandPalette as ExtractFunction<typeof showCommandPalette>
			}
		}
	}
}))

/**
 * `CommandsGizmo` is a gizmo that provides the ability to register commands.
 *
 * Each command has two parts:
 * - a contribution, which is a static object that describes the command.
 * - a handler, which is a function that is called when the command is executed.
 *
 * This means the command contribution can be defined by one gizmo,
 * and the implementation of the command can be provided by another gizmo.
 */
export type CommandsGizmo = define.Infer<typeof commandsGizmoFn>
