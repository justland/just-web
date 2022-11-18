import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import { BrowserHistory } from 'history'
import { isType } from 'type-plus'
import { presetsBrowserPlugin } from './presetsBrowserPlugin'

describe(`browserPresetsPlugin`, () => {
  it('provides history', () => {
    const app = createTestApp()
      .extend(commandsPlugin())
      .extend(presetsBrowserPlugin())
    isType.equal<true, BrowserHistory, typeof app.history>()
  })

  it('customize history', () => {
    createTestApp()
      .extend(commandsPlugin())
      .extend(presetsBrowserPlugin({ history: { window } }))
  })
})
