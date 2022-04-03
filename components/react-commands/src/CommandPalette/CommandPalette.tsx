import { ReadonlyContext } from '@just-web/contexts'
import { CommandContribution, KeyBindingContribution } from '@just-web/contributions'
import { sentenceCase } from '@just-web/format'
import { FC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { mapKey, required } from 'type-plus'
import { getContext } from '../context'
import styles from './CommandPalette.module.css'

export type CommandPaletteCommand = CommandContribution & KeyBindingContribution

export interface CommandPaletteProps {
  ctx?: ReadonlyContext
}

function getCommands(ctx: ReadonlyContext) {
  const m = ctx.platform.isMacOS()
  const cmds = ctx.contributions.commands.get()
  const kbs = ctx.contributions.keyBindings.get()
  return mapKey(cmds, cmdKey => {
    const c = cmds[cmdKey]
    const r = {
      ...c,
      name: c.name ?? sentenceCase(c.command.split('.', 2)[1]),
      command: () => ctx.commands.registry.invoke(c.command)
    }
    const k = kbs[cmdKey]
    return k ? { ...r, key: m ? k.mac ?? k.key : k.key } : r
  })
}

const RenderCommand: FC<{ name: string, key?: string }> = command => (
  <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>
)


const CommandPalette: FC<CommandPaletteProps> = (props) => {
  const ctx = required(getContext(), props.ctx)
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
