import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import type { AnyFunction } from 'type-plus'
import { showCommandPalette } from './commands.js'
import { contributionRegistry } from './contributions.js'
import { handlerRegistry } from './handlers.js'
import type { CommandContribution, CommandsContext } from './types.js'

export type CommandsOptions = {
	commands?: {
		contributions?: Array<CommandContribution>
		handlers?: Record<string, AnyFunction>
	}
}
export const commandsPlugin = definePlugin((options?: CommandsOptions) => ({
	name: '@just-web/commands',
	init: (ctx: LogContext & Partial<KeyboardContext>): [CommandsContext] => {
		const contributions = contributionRegistry(ctx, options?.commands?.contributions)
		const handlers = handlerRegistry(ctx, options?.commands?.handlers)

		contributions.add(showCommandPalette)
		ctx.keyboard?.keyBindingContributions.add(showCommandPalette)

		return [
			{
				commands: {
					contributions,
					handlers,
					showCommandPalette
				}
			}
		]
	}
}))
