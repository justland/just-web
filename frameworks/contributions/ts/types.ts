import { CommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry } from './keyBindings'

export interface ContributionsContext {
  contributions: {
    commands: CommandContributionRegistry,
    keyBindings: KeyBindingContributionRegistry
  }
}
