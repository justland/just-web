import { getLogger } from '@just-web/app'
import type { KeyBindingContribution, KeyboardGizmo } from '@just-web/keyboard'
import type { AnyFunction } from 'type-plus'
import type { CommandsGizmo } from './commands_gizmo.js'
import type { Command, CommandContribution } from './types.js'

/**
 * Creates a public command.
 * A public command can be discovered by application and other plugins.
 * @param handler Optional default handler.
 */
export function command<F extends AnyFunction = () => void>(
	info: CommandContribution & KeyBindingContribution,
	handler?: F
): Command<F>

/**
 * Creates a local command.
 * Local commands can be used within the plugin but the application and other plugins will not see them.
 *
 * @param id `ID` of the command.
 * It should be unique across the application.
 * It should follow the `<plugin>.<name>` pattern.
 *
 * For example: `just-web.showCommandPalette`
 * The resulting command function will also have this as the name.
 */
export function command<F extends AnyFunction = () => void>(id: string, handler?: F): Command<F>
export function command<F extends AnyFunction = () => void>(
	idOrInfo: string | (CommandContribution & KeyBindingContribution),
	handler?: F
): any {
	const withIdString = typeof idOrInfo === 'string'
	const info = typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo
	let ctx: CommandsGizmo & Partial<KeyboardGizmo>

	const fn = Object.defineProperty(
		function (...args: Parameters<F>) {
			if (!ctx) return getLogger('@just-web/log').error(`cannot call '${info.id}' before connect().`)
			return ctx.commands.handlers.invoke(info.id, ...args)
		},
		'name',
		{
			enumerable: false,
			writable: false,
			configurable: false,
			value: info.id
		}
	)

	return Object.assign(fn, {
		...info,
		connect(context: CommandsGizmo & Partial<KeyboardGizmo>, hdr?: F) {
			ctx = context
			hdr = hdr ?? handler
			if (!hdr) return

			ctx.commands.handlers.register(info.id, hdr)

			if (withIdString) return

			ctx.commands.contributions.add(info)
			if (ctx.keyboard && (info.key || info.mac)) {
				ctx.keyboard.keyBindingContributions.add(info)
			}
		},
		defineHandler(handler: F) {
			return handler
		}
	})
}
