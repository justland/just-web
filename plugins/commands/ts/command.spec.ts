import { command } from './command'
import keyboardPlugin, { KeyboardOptions } from '@just-web/keyboard'
import plugin, { CommandsOptions } from '.'
import { LogOptions, logTestPlugin } from '@just-web/log'

function setupPlugin(options?: LogOptions & KeyboardOptions & CommandsOptions) {
  const [{ log }] = logTestPlugin(options).init()
  const [{ keyboard }] = keyboardPlugin(options).init({ log })
  const [{ commands }] = plugin(options).init({ log, keyboard })
  return [{ log, keyboard, commands }]
}

describe(`${command.name}()`, () => {
  it('can be used as a helper to register and invoke command', () => {
    const [{ commands }] = setupPlugin()
    const inc = command<(value: number) => number>('plugin-a.increment')

    commands.handlers.register(inc.type, inc.defineHandler(value => value + 1))
    const result = commands.handlers.invoke(inc.type, ...inc.defineArgs(3))

    expect(result).toEqual(4)
  })

  it('can define a default handler (and type is inferred)', () => {
    const [{ commands }] = setupPlugin()
    const inc = command('plugin-a.increment', value => value + 1)

    commands.handlers.register(inc.type, inc.defaultHandler)
    const result = commands.handlers.invoke(inc.type, ...inc.defineArgs(3))

    expect(result).toEqual(4)
  })

  it('can use `connect()` to do the register and invoke for you', () => {
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
})
