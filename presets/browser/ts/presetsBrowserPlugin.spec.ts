import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import { createMemoryHistory, History } from 'history'
import { isType } from 'type-plus'
import presetsBrowserPlugin from './presetsBrowserPlugin.js'

describe(`browserPresetsPlugin`, () => {
  it('provides history', () => {
    const app = createTestApp()
      .extend(commandsPlugin())
      .extend(presetsBrowserPlugin())
    isType.equal<true, History, typeof app.history>()
  })

  it('customize history', () => {
    createTestApp()
      .extend(commandsPlugin())
      .extend(presetsBrowserPlugin({ history: createMemoryHistory() }))
  })
})
