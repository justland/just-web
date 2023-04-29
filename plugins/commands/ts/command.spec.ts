import { createMemoryLogReporter, LogGizmoOptions } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { KeyboardGizmo, keyboardGizmoFn, KeyboardGizmoOptions } from '@just-web/keyboard'
import { a } from 'assertron'
import { configGlobal } from 'standard-log'
import { ExtractFunction, testType } from 'type-plus'
import { command, CommandsGizmo, commandsGizmoFn, CommandsGizmoOptions } from './index.js'

function setupPlugin(options?: LogGizmoOptions & KeyboardGizmoOptions & CommandsGizmoOptions) {
	return justTestApp().with(keyboardGizmoFn(options)).with(commandsGizmoFn(options)).create()
}

describe(`${command.name}()`, () => {
	it('can be called with string id', () => {
		command('some-command')
	})

	it('can be called with CommandContribution', () => {
		// note that all other fields in CommandContribution are optional
		command({ id: 'some-command' })
		command({ id: 'some-command', title: 'Do some work' })
	})

	it('can be called with KeyBindingContribution', () => {
		command({ id: 'some-command', key: 'ctrl+s' })
		command({ id: 'some-command', mac: 'cmd+s' })
	})

	it('can provide a default handler (and the type is inferred)', () => {
		const cmd = command({ id: 'some-command' }, (v: number) => v + 1)

		type P = Parameters<typeof cmd>
		type R = ReturnType<typeof cmd>
		testType.equal<P, [v: number]>(true)
		testType.equal<R, number>(true)
	})

	it('can specify the type of the command', () => {
		const cmd = command<() => number>('some-command')

		testType.equal<ExtractFunction<typeof cmd>, () => number>(true)

		cmd.defineHandler(() => 1)
		type PDH = Parameters<typeof cmd.defineHandler>
		testType.equal<PDH, [() => number]>(true)
	})

	it('can specify type with function overloads', () => {
		const cmd = command<{
			(): number
			(v: string): string
		}>('overload')

		type C = typeof cmd
		testType.canAssign<C, { (): number; (v: string): string }>(true)
	})

	it('can be added directly to contributions', async () => {
		const { commands } = await setupPlugin()
		const inc = command({
			id: 'plugin-a.increment',
			title: 'Increment',
			description: 'Increment input value by 1'
		})
		commands.contributions.add(inc)

		const actual = commands.contributions.values().find(c => c.id === 'plugin-a.increment')!
		a.satisfies(actual, {
			id: 'plugin-a.increment',
			title: 'Increment',
			description: 'Increment input value by 1'
		})
	})

	it('uses id as the function name', async () => {
		const cmd = command('someCommand')

		expect(cmd.name).toEqual('someCommand')
	})

	describe('invoking the command', () => {
		it('before connect() emits an error', () => {
			const memory = createMemoryLogReporter()
			configGlobal({ reporters: [memory] })
			const inc = command('some-command')

			inc()

			expect(memory.getLogMessagesWithIdAndLevel()).toEqual([
				`@just-web/log (ERROR) cannot call 'some-command' before connect().`
			])
		})

		it('returns the result of the command', async () => {
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'increment' }, (v: number) => v + 1)
			inc.connect({ commands, keyboard })

			const result = inc(3)

			expect(result).toEqual(4)
		})
	})

	describe('connect()', () => {
		it('does not require handler even if no default handler defined', async () => {
			// this is the case when one package defines the command,
			// and another package provides the implementation.
			const { commands, keyboard } = await setupPlugin()
			const inc = command<(value: number) => number>({ id: 'plugin-a.increment' })

			inc.connect({ commands, keyboard })

			testType.equal<
				Parameters<typeof inc.connect>,
				[context: CommandsGizmo & Partial<KeyboardGizmo>, handler?: ((value: number) => number)|undefined]
			>(true)
		})

		it('can override with another handler', async () => {
			// this is the case when there is a general way to implement a command,
			// but it can be overridden in specific platform
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

			inc.connect({ commands, keyboard }, v => v + 2)

			expect(inc(3)).toEqual(5)
		})

		it('can be called without handler if the command already have one', async () => {
			// this is the case when the package defines the command,
			// and provides the implementation together.
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

			inc.connect({ commands, keyboard })

			expect(inc(3)).toEqual(4)
		})

		it('string based command will not add to contributions', async () => {
			// i.e. without default handler, the `connect()` call is doing nothing.
			// may improve the type to disallow this usage.
			const { commands, keyboard } = await setupPlugin()
			const inc = command('plugin-a.increment', (v: number) => v + 1)

			inc.connect({ commands, keyboard })

			expect(commands.contributions.has('plugin-a.increment')).toBe(false)
			expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
		})

		it('object/info based command will be add to contributions', async () => {
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

			inc.connect({ commands, keyboard })

			expect(commands.contributions.has('plugin-a.increment')).toBe(true)
			expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
		})

		it('object/info based command with key/mac will be add to keybindings', async () => {
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'plugin-a.increment', key: 'ctrl+a' }, (v: number) => v + 1)

			inc.connect({ commands, keyboard })

			expect(commands.contributions.has('plugin-a.increment')).toBe(true)
			expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(true)
		})

		it('will note add to contribution if handler is not defined', async () => {
			// this allows the implementation to connect the command,
			// instead of getting duplicate registration and get ignored.
			const { commands, keyboard } = await setupPlugin()
			const inc = command({ id: 'plugin-a.increment', key: 'ctrl+a' })

			inc.connect({ commands, keyboard })

			expect(commands.contributions.has('plugin-a.increment')).toBe(false)
			expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
		})

		it(`works without KeyboardContext, which will skip the registration`, async () => {
			const { commands } = await setupPlugin()
			const inc = command(
				{
					id: 'plugin-a.increment',
					key: 'ctrl+i'
				},
				(v: number) => v + 1
			)

			inc.connect({ commands })

			expect(inc(3)).toEqual(4)
		})
	})
})
