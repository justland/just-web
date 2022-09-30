import { CommandContributionRegistry, ReadonlyCommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry, ReadonlyKeyBindingContributionRegistry } from './keyBindings'

export interface ContributionsContext {
  contributions: {
    commands: CommandContributionRegistry,
    keyBindings: KeyBindingContributionRegistry
  }
}

export interface ReadonlyContributionsContext {
  contributions: {
    commands: ReadonlyCommandContributionRegistry,
    keyBindings: ReadonlyKeyBindingContributionRegistry
  }
}
