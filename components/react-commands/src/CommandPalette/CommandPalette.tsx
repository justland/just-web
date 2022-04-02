import { invokeCommand } from '@just-web/commands'
import { Command, commands, KeyBinding, keyBindings } from '@just-web/contributions'
import { sentenceCase } from '@just-web/format'
import { isMacOS } from '@just-web/platform'
import { FC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { mapKey, required } from 'type-plus'
import styles from './CommandPalette.module.css'

export interface CommandPaletteCtx {
  commands: typeof commands,
  isMacOS: typeof isMacOS,
  keyBindings: typeof keyBindings
}

export type CommandPaletteCommand = Command & KeyBinding

export interface CommandPaletteProps {
  ctx?: Partial<CommandPaletteCtx>
}

function getCommands(ctx: CommandPaletteCtx) {
  const m = ctx.isMacOS()
  const cmds = ctx.commands.get()
  const kbs = ctx.keyBindings.get()
  return mapKey(cmds, cmdKey => {
    const c = cmds[cmdKey]
    const r = {
      ...c,
      name: c.name ?? sentenceCase(c.command.split('.', 2)[1]),
      command: () => invokeCommand(c.command)
    }
    const k = kbs[cmdKey]
    return k ? { ...r, key: m ? k.mac ?? k.key : k.key } : r
  })
}

const RenderCommand: FC<{ name: string, key?: string }> =
  command => <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>

const defaultCtx = { isMacOS, commands, keyBindings }

const CommandPalette: FC<CommandPaletteProps> = (props) => {
  const ctx = required(defaultCtx, props.ctx)
  const commands = getCommands(ctx)
  return <CP
    commands={commands}
    closeOnSelect={true}
    open={true}
    hotKeys={'ctrl+p'}
    theme={{ ...theme, trigger: styles.trigger }}
    renderCommand={RenderCommand}
  />
}

export default CommandPalette
