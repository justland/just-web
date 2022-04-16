import { Context, createContext } from '@just-web/app'
import { ComponentStory } from '@storybook/react'
import Mousetrap from 'mousetrap'
import { lazy, Suspense } from 'react'
import { activate } from '../module'
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

function addCommand(ctx: Context, ...inputs: Array<Contribution>) {
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
  key: 'ctrl+s'
}
const macCmd = {
  command: 'core.macCommand',
  name: 'Command with mac key override',
  key: 'ctrl+s',
  mac: 'cmd+s'
}
const macOnlyCmd = {
  command: 'core.macOnlyCommand',
  name: 'Command with only mac key',
  mac: 'cmd+s'
}

const Story: ComponentStory<typeof CommandPalette> = ({ ...args }) => {
  return <>
    <div>ctrl+p to show the command palette</div>
    <CommandPalette {...args} />
  </>
}

export const NoCommand = () => {
  const context = createContext()
  const Lazy = lazy(async () => {
    await activate(context)
    return { default: Story }
  })
  return <Suspense fallback={<div>...loading...</div>}>
    <Lazy />
  </Suspense>
}

NoCommand.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OneCommand = () => {
  const context = createContext()
  addCommand(context, simpleCmd)
  const Lazy = lazy(async () => {
    await activate(context)
    return { default: Story }
  })
  return <Suspense fallback={<div>...loading...</div>}>
    <Lazy />
  </Suspense>
}

OneCommand.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const WithKey = () => {
  const context = createContext()
  addCommand(context, keyedCmd)
  const Lazy = lazy(async () => {
    await activate(context)
    return { default: Story }
  })
  return <Suspense fallback={<div>...loading...</div>}>
    <Lazy />
  </Suspense>
}

WithKey.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInMac = () => {
  const context = createContext()
  context.platform = {
    ...context.platform,
    isMac: () => true
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  const Lazy = lazy(async () => {
    await activate(context)
    return { default: Story }
  })
  return <Suspense fallback={<div>...loading...</div>}>
    <Lazy />
  </Suspense>
}

OverrideMacCommandInMac.play = () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInWindow = () => {
  const context = createContext()
  context.platform = {
    ...context.platform,
    isMac: () => false
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  const Lazy = lazy(async () => {
    await activate(context)
    return { default: Story }
  })
  return <Suspense fallback={<div>...loading...</div>}>
    <Lazy />
  </Suspense>
}

OverrideMacCommandInWindow.play = () => {
  Mousetrap.trigger('ctrl+p')
}
