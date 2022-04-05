import { configForTest, MemoryLogReporter } from '@just-web/log'
import { assertLog } from '@just-web/testing'
import { createApp } from './app'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

test('needs to register route for /', () => {
  const app = createApp()
  app.start()
  assertLog(reporter,
    `(NOTICE) application starts`,
    `(ERROR) route '/' is required`,
    `(ERROR) route '/error' is required`
  )
})
