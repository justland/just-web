import { getLogger } from '@just-web/app'
import type { KeyBindingContribution, KeyboardGizmo } from '@just-web/keyboard'
import type { AnyFunction } from 'type-plus'
import type { CommandsGizmo } from './commands_gizmo.js'
import type { Command, CommandContribution, OverloadFallback } from './types.js'

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
export function command<F extends AnyFunction = () => void>(id: string, handler?: OverloadFallback<F>): Command<F>
export function command<F extends AnyFunction = () => void>(
	idOrInfo: string | (CommandContribution & KeyBindingContribution),
	handler?: F
): any {
	const withIdString = typeof idOrInfo === 'string'
	const info = typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo
	let h = handler
	let ctx: CommandsGizmo & Partial<KeyboardGizmo>

	const fn = Object.defineProperty(
		(...args: Parameters<F>) => {
			if (ctx) return ctx.commands.handlers.invoke(info.id, ...args)

			if (h) return h(...args)

			getLogger('@just-web/commands').error(`cannot call '${info.id}' before connect() or defineHandler().`)
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
		connect(context: CommandsGizmo & Partial<KeyboardGizmo>, handler?: F) {
			ctx = context
			h = handler ?? h
			if (!ctx || !h) return

			ctx.commands.handlers.register(info.id, h)

			if (withIdString) return

			ctx.commands.contributions.add(info)
			if (ctx.keyboard && (info.key || info.mac)) {
				ctx.keyboard.keyBindingContributions.add(info)
			}
		},
		defineHandler(handler: F) {
			return (h = handler)
		}
	})
}
