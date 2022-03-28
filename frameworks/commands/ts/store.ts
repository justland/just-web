import { OnStateChange, SetState } from '@just-web/states'
import { Command } from './types'

let cmds: Map<string, Command> = new Map()
let setCmds: SetState<Map<string, Command>> = (value) => cmds = value
export const store = {
  getCommands() { return cmds },
  setCommands(commands: Map<string, Command>) { setCmds(commands) },
  activate(
    commands: Map<string, Command>,
    setValue: SetState<Map<string, Command>>,
    onChange: OnStateChange<Map<string, Command>>) {
    cmds = commands
    onChange(v => cmds = v)
    setCmds = setValue
  }
}
