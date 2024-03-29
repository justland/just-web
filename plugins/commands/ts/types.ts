import type { KeyboardGizmo } from '@just-web/keyboard'
import type { Registry, WithAdder } from '@just-web/states'
import type { AnyFunction, CanAssign, ExtractFunction } from 'type-plus'
import type { CommandsGizmo } from './commands_gizmo.js'

export interface CommandHandler {
	/**
	 * The command id. e.g. `just-web.showCommandPalette`
	 */
	id: string
	handler: AnyFunction
}

export interface HandlerRegistry {
	/**
	 * register handler for the specified command.
	 */
	register(id: string, handler: AnyFunction): void
	/**
	 * invoke a registered command.
	 * @param args arguments for the command
	 */
	invoke(id: string, ...args: any[]): any
	/**
	 * Gets all registered command names.
	 */
	keys(): string[]
	has(id: string): boolean
}

export interface CommandContribution {
	/**
	 * The command id. e.g. `just-web.showCommandPalette`
	 *
	 * It should be unique across the application.
	 * It should follow the `<gizmo>.<name>` pattern.
	 *
	 * For example: `just-web.showCommandPalette`
	 * The resulting command function will also have this as the name.
	 */
	id: string
	/**
	 * Name of the command such as `Show command palette`.
	 * If not specified,
	 * it is default to Sentence Case of the second part of the `id`.
	 */
	title?: string
	/**
	 * Detail description about the command.
	 * It will support some formatting such as markdown,
	 * but not confirmed yet.
	 */
	description?: string
	/**
	 * By default, all commands will be available to the command palette.
	 * Set this to false to prevent it from appearing in the command palette.
	 */
	commandPalette?: false
	/**
	 * Category can be used by the UI to group or filter the command.
	 */
	category?: string

	icon?: {
		light: string
		/**
		 * If not specified, the `light` icon will be used.
		 */
		dark?: string
	}
	// ? no use case yet
	// enabled?: boolean,
	// when?: string,
}

// this is a workaround
export type Partial<T> = { [P in keyof T]?: T[P] | undefined }

export type OverloadFallback<T extends AnyFunction, Then = AnyFunction, Else = T> = CanAssign<
	ExtractFunction<T>,
	T,
	Else,
	Then
>

export interface ContributionRegistry
	extends Registry<string, CommandContribution>,
		WithAdder<CommandContribution> {}

export type Command<F extends AnyFunction = () => void> = F & {
	/**
	 * Id of the command.
	 * It should be unique across the application.
	 * It should follow the `<gizmo>.<name>` pattern.
	 */
	id: string
	/**
	 * Connects a command to the app context.
	 *
	 * If `handler` is provided,
	 * the command function can be called directly which will invoke the command.
	 *
	 * If contribution and/or keybindings are defined in the command,
	 * They will also be registered automatically.
	 *
	 * If the command is defined with string, i.e. `command('name',...)`,
	 * it will not be added to contribution.
	 * It's a shortcut so that local commands can also use `connect()` to setup itself.
	 *
	 * If you want the command to be available outside (i.e. register to contributions),
	 * use the object form `command({...}, ...)`.
	 */
	connect(ctx: CommandsGizmo & Partial<KeyboardGizmo | undefined>, handler?: F): void
	defineHandler(handler: OverloadFallback<F>): F
	// defineHandler(handler: AnyFunction): F
}
