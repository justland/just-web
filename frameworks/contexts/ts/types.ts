// import {} from '@just-web/contributes'
import { ReadonlyCommandRegistry } from '@just-web/commands'

export interface ReadonlyContext {
  commands: {
    registry: ReadonlyCommandRegistry
  },
  contributions: {
    // commands: ReadonlyCommandContributionsRegistry
  }
}
