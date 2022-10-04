import { createApp } from '@just-web/app'
import browserContributionsPlugin from '@just-web/browser-contributions'
import commandsPlugin, { CommandsOptions } from '@just-web/commands'
import contributionsPlugin, { ContributionsOptions } from '@just-web/contributions'
import { createColorLogReporter, logLevels } from '@just-web/log'
import { isMac, OSOptions, osTestPlugin } from '@just-web/os'
import { ComponentStory } from '@storybook/react'
import Mousetrap from 'mousetrap'
import plugin from '..'
import { getStore } from '../store'
import CommandPalette from './CommandPalette'

type Story = ComponentStory<typeof CommandPalette>

const shortcut = isMac() ? 'cmd+p' : 'ctrl+p'

export default {
  component: ({ ...args }) => {
    const ctx = getStore().get().context
    const shortcut = ctx.os.isMac() ? 'cmd+p' : 'ctrl+p'
    return <>
      <div><code>{shortcut}</code> to show the command palette</div>
      <button onClick={() => {
        ctx.commands.showCommandPalette()
      }}>Open Command Palette</button>
      <CommandPalette {...args} />
    </>
  }
}

const simpleCmd = { command: 'core.simpleCommand' }
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

async function setupApp(options?: ContributionsOptions & CommandsOptions & OSOptions) {
  const reporter = createColorLogReporter()
  const app = createApp({ name: 'storybook', log: { logLevel: logLevels.all, reporters: [reporter] } })
    .extend(contributionsPlugin(options))
    .extend(commandsPlugin(options))
    .extend(osTestPlugin(options))
    .extend(browserContributionsPlugin())
    .extend(plugin())
  console.info('app', app)
  await app.start()
  return {}
}

export const NoCommand = {
  loaders: [async (_) => setupApp()],
  play: async (_) => void Mousetrap.trigger(shortcut)
} as Story

export const OneCommand = {
  loaders: [async (_) => setupApp({
    contributions: {
      commands: [simpleCmd]
    },
    commands: {
      [simpleCmd.command]: () => alert(simpleCmd.command)
    }
  })],
  play: async (_) => void Mousetrap.trigger(shortcut)
} as Story

export const WithKey = {
  loaders: [async (_) => setupApp({
    contributions: {
      commands: [keyedCmd],
      keyBindings: [keyedCmd]
    },
    commands: {
      [keyedCmd.command]: () => alert(keyedCmd.command)
    }
  })],
  play: async (_) => void Mousetrap.trigger(shortcut)
} as Story

export const OverrideMacCommandInMac = {
  loaders: [async (_) => setupApp({
    contributions: {
      commands: [simpleCmd, keyedCmd, macCmd, macOnlyCmd],
      keyBindings: [keyedCmd, macCmd, macOnlyCmd]
    },
    commands: {
      [simpleCmd.command]: () => alert(simpleCmd.command),
      [keyedCmd.command]: () => alert(keyedCmd.command),
      [macCmd.command]: () => alert(macCmd.command),
      [macOnlyCmd.command]: () => alert(macOnlyCmd.command)
    },
    os: {
      isMac: () => true
    }
  })],
  play: async (_) => void Mousetrap.trigger('command+p')
} as Story

export const OverrideMacCommandInWindow = {
  loaders: [async (_) => setupApp({
    contributions: {
      commands: [simpleCmd, keyedCmd, macCmd, macOnlyCmd],
      keyBindings: [keyedCmd, macCmd, macOnlyCmd]
    },
    commands: {
      [simpleCmd.command]: () => alert(simpleCmd.command),
      [keyedCmd.command]: () => alert(keyedCmd.command),
      [macCmd.command]: () => alert(macCmd.command),
      [macOnlyCmd.command]: () => alert(macOnlyCmd.command)
    },
    os: {
      isMac: () => false
    }
  })],
  play: async (_) => void Mousetrap.trigger('ctrl+p')
} as Story
