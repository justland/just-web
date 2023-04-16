import { commandsPlugin } from './commands_plugin.js'
export * from './command.js'
export * from './commands.js'
export type { CommandsOptions } from './commands_plugin.js'
export * from './formatCommand.js'
export type {
	Command, CommandContribution,
	CommandHandler,
	CommandsContext,
	ContributionRegistry,
	HandlerRegistry
} from './types.js'


export default commandsPlugin
