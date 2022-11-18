import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import { BrowserHistory } from 'history'
import { isType } from 'type-plus'
import { browserPresetsPlugin } from './browserPresetsPlugin'

describe(`browserPresetsPlugin`, () => {
  it('provides history', () => {
    const app = createTestApp()
      .extend(commandsPlugin())
      .extend(browserPresetsPlugin())
    isType.equal<true, BrowserHistory, typeof app.history>()
  })

  it('customize history', () => {
    createTestApp()
      .extend(commandsPlugin())
      .extend(browserPresetsPlugin({ history: { window } }))
  })
})
