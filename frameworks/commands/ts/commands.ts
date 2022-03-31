import produce from 'immer'
import { log } from './log'
import { store } from './store'

export function getCommands() {
  return store.get()
}

/**
 * handles command defined in `contributes` by the app and plugins.
 */
export function handleCommand(command: string, handler: () => void) {
  log.trace('handleCommand', command)
  const commands = store.get()
  if (commands[command]) {
    log.warn(`Registering a handler for an already registered command: '${command}'`)
    return
  }
  store.set(produce(commands, m => { m[command] = handler }))
}

export function invokeCommand(command: string) {
  log.trace('invokeCommand', command)
  const handler = store.get()[command]
  handler ? handler() : log.error(`Invoking not registered command: '${command}'`)
}

export function clearCommands() {
  log.trace('clearCommands')
  store.reset()
}
