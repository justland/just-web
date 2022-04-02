import { commandContributionRegistry } from '@just-web/contributes'
import { createRegistry } from '@just-web/states'
import produce from 'immer'
import { log } from './log'
import { CommandHandler } from './types'

export namespace commandRegistry {
  export interface Options {
    commands: Record<string, CommandHandler>,
    contributions: {
      commands: ReturnType<typeof commandContributionRegistry>
    }
  }
}

export function commandRegistry(options: commandRegistry.Options) {
  const { contributions } = options

  const registry = createRegistry<() => void, string>(options.commands)

  return {
    /**
     * register handler for specified command.
     */
    register(command: string, handler: CommandHandler) {
      log.trace('register', command)
      if (!~contributions.commands.keys().indexOf(command))
        return log.error(`Registering an unknown command: ${command}`)

      const commands = registry.get()
      if (commands[command]) {
        log.warn(`Registering a duplicate command, ignored: ${command}`)
        return
      }
      registry.set(produce(commands, m => { m[command] = handler }))
    },
    invoke(command: string) {
      log.trace('invoke', command)
      const handler = registry.get()[command]
      handler ? handler() : log.error(`Invoking not registered command: '${command}'`)
    },
    keys: registry.keys.bind(registry),
    onChange: registry.onChange.bind(registry)
  }
}