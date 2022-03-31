import { createStore } from '@just-web/states'
import { record } from 'type-plus'

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

export const keyBindings = createStore(record<string, KeyBinding>())
