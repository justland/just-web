import { DepBuilder, GizmoStatic, define } from '@just-web/app'
import type { KeyboardGizmo } from '@just-web/keyboard'
import type { LogGizmo } from '@just-web/log'
import type { AnyFunction } from 'type-plus'
import { showCommandPalette } from './commands.js'
import { contributionRegistry } from './contributions.js'
import { handlerRegistry } from './handlers.js'
import type { Command, CommandContribution, ContributionRegistry, HandlerRegistry } from './types.js'

export type CommandsGizmoOptions = {
	contributions?: Array<CommandContribution>
	handlers?: Record<string, AnyFunction>
}

export const commandsGizmoFn: (options?: CommandsGizmoOptions) => GizmoStatic<
	DepBuilder<LogGizmo, KeyboardGizmo>,
	{
		commands: {
			contributions: ContributionRegistry
			handlers: HandlerRegistry
			showCommandPalette: Command
		}
	}
> = define((options?: CommandsGizmoOptions) => ({
	static: define.require<LogGizmo>().optional<KeyboardGizmo>(),
	async create(ctx) {
		const contributions = contributionRegistry(ctx, options?.contributions)
		const handlers = handlerRegistry(ctx, options?.handlers)

		contributions.add(showCommandPalette)
		ctx.keyboard?.keyBindingContributions.add(showCommandPalette)

		return {
			commands: {
				contributions,
				handlers,
				showCommandPalette
			}
		}
	}
}))

export type CommandsGizmo = define.Infer<typeof commandsGizmoFn>
