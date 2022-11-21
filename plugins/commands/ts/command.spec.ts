import keyboardPlugin, { KeyboardContext, KeyboardOptions } from '@just-web/keyboard'
import { createMemoryLogReporter, LogOptions, logTestPlugin } from '@just-web/log'
import { a } from 'assertron'
import { configGlobal } from 'standard-log'
import { CanAssign, ExtractFunction, isType } from 'type-plus'
import commandsPlugin, { command, CommandsContext, CommandsOptions } from '.'

function setupPlugin(options?: LogOptions & KeyboardOptions & CommandsOptions) {
  const [{ log }] = logTestPlugin(options).init()
  const [{ keyboard }] = keyboardPlugin(options).init({ log })
  const [{ commands }] = commandsPlugin(options).init({ log, keyboard })
  return [{ log, keyboard, commands }]
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
    isType.equal<true, [v: number], P>()
    isType.equal<true, number, R>()
  })

  it('can specify the type of the command', () => {
    const cmd = command<() => number>('some-command')

    isType.equal<true, () => number, ExtractFunction<typeof cmd>>()

    cmd.defineHandler(() => 1)
    type PDH = Parameters<typeof cmd.defineHandler>
    isType.equal<true, [() => number], PDH>()
  })

  it('can specify type with function overloads', () => {
    const cmd = command<{
      (): number,
      (v: string): string
    }>('overload')

    type C = typeof cmd
    isType.t<CanAssign<C, { (): number, (v: string): string }>>()
  })

  it('can be added directly to contributions', () => {
    const [{ commands }] = setupPlugin()
    const inc = command({
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1'
    })
    commands.contributions.add(inc)

    const actual = commands.contributions.list().find(c => c.id === 'plugin-a.increment')!
    a.satisfies(actual, {
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1'
    })
  })

  it('uses id as the function name', () => {
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

    it('returns the result of the command', () => {
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'increment' }, (v: number) => v + 1)
      inc.connect({ commands, keyboard })

      const result = inc(3)

      expect(result).toEqual(4)
    })
  })

  describe('connect()', () => {
    it('does not require handler even if no default handler defined', () => {
      // this is the case when one package defines the command,
      // and another package provides the implementation.
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command<(value: number) => number>({ id: 'plugin-a.increment' })

      inc.connect({ commands, keyboard })

      isType.equal<true,
        [context: CommandsContext & Partial<KeyboardContext>, handler?: (value: number) => number],
        Parameters<typeof inc.connect>>()
    })

    it('can override with another handler', () => {
      // this is the case when there is a general way to implement a command,
      // but it can be overridden in specific platform
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

      inc.connect({ commands, keyboard }, v => v + 2)

      expect(inc(3)).toEqual(5)
    })

    it('can be called without handler if the command already have one', () => {
      // this is the case when the package defines the command,
      // and provides the implementation together.
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

      inc.connect({ commands, keyboard })

      expect(inc(3)).toEqual(4)
    })

    it('string based command will not add to contributions', () => {
      // i.e. without default handler, the `connect()` call is doing nothing.
      // may improve the type to disallow this usage.
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command('plugin-a.increment', (v: number) => v + 1)

      inc.connect({ commands, keyboard })

      expect(commands.contributions.has('plugin-a.increment')).toBe(false)
      expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
    })

    it('object/info based command will be add to contributions', () => {
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)

      inc.connect({ commands, keyboard })

      expect(commands.contributions.has('plugin-a.increment')).toBe(true)
      expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
    })

    it('object/info based command with key/mac will be add to keybindings', () => {
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment', key: 'ctrl+a' }, (v: number) => v + 1)

      inc.connect({ commands, keyboard })

      expect(commands.contributions.has('plugin-a.increment')).toBe(true)
      expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(true)
    })

    it('will note add to contribution if handler is not defined', () => {
      // this allows the implementation to connect the command,
      // instead of getting duplicate registration and get ignored.
      const [{ commands, keyboard }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment', key: 'ctrl+a' })

      inc.connect({ commands, keyboard })

      expect(commands.contributions.has('plugin-a.increment')).toBe(false)
      expect(keyboard.keyBindingContributions.has('plugin-a.increment')).toBe(false)
    })

    it(`works without KeyboardContext, which will skip the registration`, () => {
      const [{ commands }] = setupPlugin()
      const inc = command({
        id: 'plugin-a.increment',
        key: 'ctrl+i'
      }, (v: number) => v + 1)

      inc.connect({ commands })

      expect(inc(3)).toEqual(4)
    })
  })
})
