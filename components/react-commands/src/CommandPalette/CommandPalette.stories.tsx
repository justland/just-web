import { createTestApp, TestAppContext } from '@just-web/app'
import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { logLevels } from '@just-web/log'
import { ComponentStory } from '@storybook/react'
import Mousetrap from 'mousetrap'
import * as module from '..'
import CommandPalette from './CommandPalette'

export default {
  component: CommandPalette
}

interface Contribution {
  command: string,
  name?: string,
  key?: string,
  mac?: string
}

function addCommand(ctx: CommandsContext & ContributionsContext, ...inputs: Array<Contribution>) {
  inputs.forEach(entry => {
    ctx.contributions.commands.add({ command: entry.command, description: entry.name })
    ctx.commands.register(entry.command, () => { alert(entry.command) })
    if (entry.key || entry.mac) {
      ctx.contributions.keyBindings.add(entry)
    }
  })
}

const simpleCmd: Contribution = { command: 'core.simpleCommand' }
const keyedCmd = {
  command: 'core.keyedCommand',
  name: 'Command with key',
  key: 'ctrl+k'
}
const macCmd = {
  command: 'core.macCommand',
  name: 'Command with mac key override',
  key: 'ctrl+m',
  mac: 'cmd+m'
}
const macOnlyCmd = {
  command: 'core.macOnlyCommand',
  name: 'Command with only mac key',
  mac: 'cmd+o'
}

const Story: ComponentStory<typeof CommandPalette> = ({ ...args }) => {
  return <>
    <div>ctrl+p to show the command palette</div>
    <CommandPalette {...args} />
  </>
}

async function loadApp(setupApp?: (app: TestAppContext) => void) {
  let app = createTestApp({ log: { logLevel: logLevels.all } })
  setupApp?.(app)
  app = await app.addPlugin(module)
  await app.start()
  return {}
}

export const NoCommand = Story.bind({})
NoCommand.loaders = [
  async () => loadApp()
]

NoCommand.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OneCommand = Story.bind({})

OneCommand.loaders = [
  async () => loadApp(app => addCommand(app, simpleCmd))
]
OneCommand.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const WithKey = Story.bind({})
WithKey.loaders = [
  async () => loadApp(app => addCommand(app, keyedCmd))
]
WithKey.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInMac = Story.bind({})
OverrideMacCommandInMac.loaders = [
  async () => loadApp(app => {
    app.os = {
      ...app.os,
      isMac: () => true
    }
    addCommand(app, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  })
]
OverrideMacCommandInMac.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInWindow = Story.bind({})
OverrideMacCommandInWindow.loaders = [
  async () => loadApp(app => {
    app.os = {
      ...app.os,
      isMac: () => true
    }
    addCommand(app, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  })
]
OverrideMacCommandInWindow.play = () => {
  Mousetrap.trigger('ctrl+p')
}
