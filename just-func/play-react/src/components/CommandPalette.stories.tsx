import CommandPalette from './CommandPalette'

export default {
  component: CommandPalette
}

export const NoCommand = () => <>
<div>ctrl+p to show the command palette</div>
<CommandPalette commands={[]} />
</>
