import { createStore } from '@just-web/states'


export interface KeyBinding {
  /**
   * Command to bind to.
   */
  command: string,
  /**
   * Default key
   */
  key?: string,
  /**
   * MacOS specific key
   */
  mac?: string
}

export const keyBindings = createStore<KeyBinding[]>([])
