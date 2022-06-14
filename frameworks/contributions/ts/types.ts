import { CommandContributionRegistry, ReadonlyCommandContributionRegistry } from './commands'
import { KeyBindingContributionRegistry, ReadonlyKeyBindingContributionRegistry } from './keyBindings'

export interface ContributionsContext {
  commands: CommandContributionRegistry,
  keyBindings: KeyBindingContributionRegistry
}

export interface ReadonlyContributionsContext {
  commands: ReadonlyCommandContributionRegistry,
  keyBindings: ReadonlyKeyBindingContributionRegistry
}
