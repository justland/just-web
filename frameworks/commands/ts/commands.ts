import produce from 'immer'
import { log } from './log'
import { store } from './store'

export function getCommands() {
  return store.get()
}

export function registerCommand(command: string, handler: () => void) {
  log.trace('registerCommand', command)
  const commands = store.get()
  if (commands[command]) {
    log.warn(`Registering an already registered command: '${command}'`)
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
