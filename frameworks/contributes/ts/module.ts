import { createStore } from '@just-web/states'
import { record } from 'type-plus'
import { Command, KeyBinding } from './types'

export namespace start {
  export interface Options {
    commands: Record<string, Command>,
    keyBindings: Record<string, KeyBinding>
  }
}

export async function start(options: start.Options) {
  const commands = createStore(record<string, Command>(options.commands))
  const keyBindings = createStore(record<string, KeyBinding>(options.keyBindings))

  return { commands, keyBindings }
}

