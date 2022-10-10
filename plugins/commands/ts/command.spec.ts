import keyboardPlugin, { KeyboardOptions } from '@just-web/keyboard'
import { createMemoryLogReporter, LogOptions, logTestPlugin } from '@just-web/log'
import { a } from 'assertron'
import { JustFunction, JustUno } from 'just-func'
import { configGlobal } from 'standard-log'
import { isType } from 'type-plus'
import plugin, { justCommand, CommandsOptions, HandlerRegistry, command } from '.'

function setupPlugin(options?: LogOptions & KeyboardOptions & CommandsOptions) {
  const [{ log }] = logTestPlugin(options).init()
  const [{ keyboard }] = keyboardPlugin(options).init({ log })
  const [{ commands }] = plugin(options).init({ log, keyboard })
  return [{ log, keyboard, commands }]
}

describe(`${justCommand.name}()`, () => {
  it('can be called with string id', () => {
    justCommand('some-command')
  })

  it('can be called with CommandContribution', () => {
    // note that all other fields in CommandContribution are optional
    justCommand({ id: 'some-command' })
    justCommand({ id: 'some-command', title: 'Do some work' })
  })

  it('can be called with KeyBindingContribution', () => {
    justCommand({ id: 'some-command', key: 'ctrl+s' })
    justCommand({ id: 'some-command', mac: 'cmd+s' })
  })

  it('can provide a default handler (and the type is inferred)', () => {
    const cmd = justCommand({ id: 'some-command', handler: (v: number) => [v + 1] })

    type P = Parameters<typeof cmd>
    type R = ReturnType<typeof cmd>
    isType.equal<true, [v: number], P>()
    isType.equal<true, JustUno<number>, R>()
  })

  it('can specify the type of the command', () => {
    const cmd = justCommand<[], JustUno<number>>('some-command')

    type P = Parameters<typeof cmd>
    type R = ReturnType<typeof cmd>
    isType.equal<true, [], P>()
    isType.equal<true, JustUno<number>, R>()

    cmd.defineHandler(() => [1])
    isType.equal<true, [JustFunction<[], JustUno<number>>], Parameters<typeof cmd.defineHandler>>()

    cmd.defineArgs()
    type DAP = Parameters<typeof cmd.defineArgs>
    isType.equal<true, [], DAP>()
  })

  it('can be added directly to contributions', () => {
    const [{ commands }] = setupPlugin()
    const inc = justCommand({
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

  it('can be registered directly to handlers', () => {
    const [{ commands }] = setupPlugin()

    const inc = justCommand({
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1',
      handler: (v: number) => [v + 1]
    })

    commands.handlers.register(inc)

    expect(commands.handlers.invoke(inc.id, 3)).toEqual([4])
  })

  describe(`defineHandler() and defineArgs()`, () => {
    it('can be used to help work directly from `handlers`', () => {
      const [{ commands }] = setupPlugin()
      const inc = justCommand<JustUno<number>, JustUno<number>>('plugin-a.increment')

      // note that doing it this way `inc()` will not work:
      // commands.handlers.register(inc.id, inc.defineHandler(v => [v + 1]))
      // this will as `inc` gets the `handlers` reference.
      inc.register([commands.handlers, inc.defineHandler(v => [v + 1])])

      const result = commands.handlers.invoke(inc.id, ...inc.defineArgs(3))

      expect(result).toEqual([4])
    })
  })

  it('can be registered directly to keybindings', () => {
    const [{ keyboard }] = setupPlugin()

    const inc = justCommand({
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1',
      key: 'ctrl+a',
      handler: (v: number) => [v + 1]
    })

    keyboard.keyBindingContributions.add(inc)

    const actual = keyboard.keyBindingContributions.list().find(c => c.id === 'plugin-a.increment')!
    a.satisfies(actual, {
      id: 'plugin-a.increment',
      key: 'ctrl+a'
    })
  })

  describe('invoking the command', () => {
    it('before register() emits an error', () => {
      const memory = createMemoryLogReporter()
      configGlobal({ reporters: [memory] })
      const inc = justCommand('some-command')

      inc()

      expect(memory.getLogMessagesWithIdAndLevel()).toEqual([
        `@just-web/log (ERROR) cannot call 'some-command' before register().`
      ])
    })

    it('returns the result of the command', () => {
      const [{ commands }] = setupPlugin()
      const inc = justCommand({ id: 'increment', handler: (v: number) => [v + 1] })
      inc.register([commands.handlers])

      const [result] = inc(3)

      expect(result).toEqual(4)
    })
  })

  describe('register()', () => {
    it('requires handler if no default handler defined', () => {
      // this is the case when one package defines the command,
      // and another package provides the implementation.
      const [{ commands }] = setupPlugin()

      const inc = justCommand<[value: number], JustUno<number>>('plugin-a.increment')

      inc.register([commands.handlers, v => [v + 1]])
      isType.equal<true,
        [[resigtry: HandlerRegistry, handler: (value: number) => JustUno<number>]],
        Parameters<typeof inc.register>>()
    })

    it('can override with another handler', () => {
      // this is the case when there is a general way to implement a command,
      // but it can be overridden in specific platform
      const [{ commands }] = setupPlugin()
      const inc = justCommand({ id: 'plugin-a.increment', handler: (v: number) => [v + 1] })
      inc.register([commands.handlers, v => [v + 2]])

      expect(inc(3)).toEqual([5])
    })

    it('can be called without handler if the command already have one', () => {
      // this is the case when the package define the command,
      // and provide the implementation together.
      const [{ commands }] = setupPlugin()
      const inc = justCommand({ id: 'plugin-a.increment', handler: (v: number) => [v + 1] })
      inc.register([commands.handlers])

      expect(inc(3)).toEqual([4])
    })
  })
})

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
    const cmd = command<[], number>('some-command')

    type P = Parameters<typeof cmd>
    type R = ReturnType<typeof cmd>
    isType.equal<true, [], P>()
    isType.equal<true, number, R>()

    cmd.defineHandler(() => 1)
    type PDH = Parameters<typeof cmd.defineHandler>
    isType.equal<true, [() => number], PDH>()

    cmd.defineArgs()
    type DAP = Parameters<typeof cmd.defineArgs>
    isType.equal<true, [], DAP>()
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

  it('can be registered directly to handlers', () => {
    const [{ commands }] = setupPlugin()

    const inc = command({
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1',
    }, (v: number) => [v + 1])

    commands.handlers.register(inc)

    expect(commands.handlers.invoke(inc.id, 3)).toEqual([4])
  })

  describe(`defineHandler() and defineArgs()`, () => {
    it('can be used to help work directly from `handlers`', () => {
      const [{ commands }] = setupPlugin()
      const inc = command<[number], number>('plugin-a.increment')

      // note that doing it this way `inc()` will not work:
      // commands.handlers.register(inc.id, inc.defineHandler(v => [v + 1]))
      // this will as `inc` gets the `handlers` reference.
      inc.register(commands.handlers, inc.defineHandler(v => v + 1))

      const result = commands.handlers.invoke(inc.id, ...inc.defineArgs(3))

      expect(result).toEqual(4)
    })
  })

  it('can be registered directly to keybindings', () => {
    const [{ keyboard }] = setupPlugin()

    const inc = command({
      id: 'plugin-a.increment',
      title: 'Increment',
      description: 'Increment input value by 1',
      key: 'ctrl+a'
    }, (v: number) => [v + 1])

    keyboard.keyBindingContributions.add(inc)

    const actual = keyboard.keyBindingContributions.list().find(c => c.id === 'plugin-a.increment')!
    a.satisfies(actual, {
      id: 'plugin-a.increment',
      key: 'ctrl+a'
    })
  })

  describe('invoking the command', () => {
    it('before register() emits an error', () => {
      const memory = createMemoryLogReporter()
      configGlobal({ reporters: [memory] })
      const inc = command('some-command')

      inc()

      expect(memory.getLogMessagesWithIdAndLevel()).toEqual([
        `@just-web/log (ERROR) cannot call 'some-command' before register().`
      ])
    })

    it('returns the result of the command', () => {
      const [{ commands }] = setupPlugin()
      const inc = command({ id: 'increment' }, (v: number) => v + 1)
      inc.register(commands.handlers)

      const result = inc(3)

      expect(result).toEqual(4)
    })
  })

  describe('register()', () => {
    it('requires handler if no default handler defined', () => {
      // this is the case when one package defines the command,
      // and another package provides the implementation.
      const [{ commands }] = setupPlugin()

      const inc = command<[value: number], number>('plugin-a.increment')

      inc.register(commands.handlers, v => v + 1)
      isType.equal<true,
        [registry: HandlerRegistry, handler: (value: number) => number],
        Parameters<typeof inc.register>>()
    })

    it('can override with another handler', () => {
      // this is the case when there is a general way to implement a command,
      // but it can be overridden in specific platform
      const [{ commands }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)
      inc.register(commands.handlers, v => v + 2)

      expect(inc(3)).toEqual(5)
    })

    it('can be called without handler if the command already have one', () => {
      // this is the case when the package define the command,
      // and provide the implementation together.
      const [{ commands }] = setupPlugin()
      const inc = command({ id: 'plugin-a.increment' }, (v: number) => v + 1)
      inc.register(commands.handlers)

      expect(inc(3)).toEqual(4)
    })
  })
})
