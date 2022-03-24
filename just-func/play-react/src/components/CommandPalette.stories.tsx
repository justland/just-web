import CommandPalette from './CommandPalette'

export default {
  component: CommandPalette
}

export const NoCommand = () => <CommandPalette commands={[]} />
