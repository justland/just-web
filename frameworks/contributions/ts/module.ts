import { commandContributionRegistry } from './commands'
import { keyBindingRegistry } from './keyBindings'

export namespace start {
  export interface Options {
    commands: commandContributionRegistry.Options['commands'],
    keyBindings: keyBindingRegistry.Options['keyBindings']
  }
}

export async function start(options: start.Options) {
  const commands = commandContributionRegistry(options)
  const keyBindings = keyBindingRegistry(options)

  return { commands, keyBindings }
}

