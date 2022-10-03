import { CommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry } from './keyBindings'

export type ContributionsContext = {
  contributions: {
    commands: CommandContributionRegistry,
    keyBindings: KeyBindingContributionRegistry
  }
}
