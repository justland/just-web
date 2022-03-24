import { FC } from 'react'
import CP from 'react-command-palette'
import { Command, KeyBinding } from '../commands'

function toPaletteCommands(cmds: CommandPalette.Props['commands']) {
  return cmds.map(c => ({
    name: c.title,

    command: () => alert({ type: 'COMMAND_INVOKE', payload: c.command })
  }))
}

const CommandPalette: FC<CommandPalette.Props> =
  (props) => {
    const commands = toPaletteCommands(props.commands)
    return <CP open={true} commands={commands} />
  }

export default CommandPalette

export namespace CommandPalette {
  export interface Props {
    commands: Array<Command & KeyBinding>
  }
}
