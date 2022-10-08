import keyboardPlugin, { KeyboardOptions } from '@just-web/keyboard'
import { LogOptions, logTestPlugin } from '@just-web/log'
import { a } from 'assertron'
import { has, none } from 'satisfier'
import plugin, { CommandsOptions } from '.'
import { command } from './command'

function setupPlugin(options?: LogOptions & KeyboardOptions & CommandsOptions) {
  const [{ log }] = logTestPlugin(options).init()
  const [{ keyboard }] = keyboardPlugin(options).init({ log })
  const [{ commands }] = plugin(options).init({ log, keyboard })
  return [{ log, keyboard, commands }]
}

describe(`${command.name}()`, () => {
  describe(`with id`, () => {
    it('helps register and invoke command', () => {
      const [{ commands }] = setupPlugin()
      const inc = command<(value: number) => number>('plugin-a.increment')

      commands.handlers.register(inc.id, inc.defineHandler(value => value + 1))
      const result = commands.handlers.invoke(inc.id, ...inc.defineArgs(3))

      expect(result).toEqual(4)
    })

    it('can define a default handler (and infers type)', () => {
      const [{ commands }] = setupPlugin()
      const inc = command('plugin-a.increment', value => value + 1)

      commands.handlers.register(inc.id, inc.defaultHandler)
      const result = commands.handlers.invoke(inc.id, ...inc.defineArgs(3))

      expect(result).toEqual(4)
    })

    it('has `connect()` register and invoke for you', () => {
      const [{ commands }] = setupPlugin()
      const inc = command<(value: number) => number>('plugin-a.increment')

      inc.connect({ commands }, value => value + 1)

      expect(inc(3)).toEqual(4)
    })

    it('can skip handler in `connect()` if default handler exists', () => {
      const [{ commands }] = setupPlugin()
      const inc = command('plugin-a.increment', value => value + 1)

      inc.connect({ commands })

      expect(inc(3)).toEqual(4)
    })

    it('can still override the handler in `connect()` even if default handler exists', () => {
      const [{ commands }] = setupPlugin()
      const inc = command('plugin-a.increment', value => value + 1)

      inc.connect({ commands }, value => value + 2)

      expect(inc(3)).toEqual(5)
    })
  })

  describe('with CommandContribution', () => {
    it('can be defined using CommandContribution', () => {
      const [{ commands }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        name: 'Increment',
        description: 'Increment input value by 1'
      })

      // only needs `commands`
      inc.connect({ commands }, value => value + 1)

      expect(inc(3)).toEqual(4)
      a.satisfies(commands.contributions.keys(), has('plugin-a.increment'))
    })

    it('can be used with default handler', () => {
      const [{ commands }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        name: 'Increment',
        description: 'Increment input value by 1'
      }, v => v + 1)

      inc.connect({ commands })

      expect(inc(3)).toEqual(4)
      a.satisfies(commands.contributions.keys(), has('plugin-a.increment'))
    })
  })

  describe(`with KeyboardContribution`, () => {
    it('can define using KeyboardContribution', () => {
      const [{ commands, keyboard }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        key: 'ctrl+k'
      })

      inc.connect({ commands, keyboard }, v => v + 1)
      expect(inc(3)).toEqual(4)
      a.satisfies(keyboard.keyBindingContributions.keys(), has('plugin-a.increment'))

      a.satisfies(commands.contributions.keys(), none('plugin-a.increment'))
    })

    it('can define default handler', () => {
      const [{ commands, keyboard }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        key: 'ctrl+k'
      }, value => value + 1)

      inc.connect({ commands, keyboard })
      expect(inc(3)).toEqual(4)
      a.satisfies(keyboard.keyBindingContributions.keys(), has('plugin-a.increment'))

      a.satisfies(commands.contributions.keys(), none('plugin-a.increment'))
    })
  })

  describe(`with both Command and Keyboard contribution`, () => {
    it('can define both contributions', () => {
      const [{ commands, keyboard }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        name: 'Increment',
        description: 'Increment input value by 1',
        key: 'ctrl+k'
      })

      inc.connect({ commands, keyboard }, v => v + 1)

      expect(inc(3)).toEqual(4)
      a.satisfies(commands.contributions.keys(), has('plugin-a.increment'))
      a.satisfies(keyboard.keyBindingContributions.keys(), has('plugin-a.increment'))
    })

    it('can define default handler', () => {
      const [{ commands, keyboard }] = setupPlugin()

      const inc = command({
        id: 'plugin-a.increment',
        name: 'Increment',
        description: 'Increment input value by 1',
        key: 'ctrl+k'
      }, value => value + 1)

      inc.connect({ commands, keyboard })

      expect(inc(3)).toEqual(4)
      a.satisfies(commands.contributions.keys(), has('plugin-a.increment'))
      a.satisfies(keyboard.keyBindingContributions.keys(), has('plugin-a.increment'))
    })
  })
})
