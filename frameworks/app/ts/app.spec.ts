import { assertLog } from '@just-web/testing'
import { configForTest, MemoryLogReporter } from 'standard-log'
import { app } from './app'

let reporter: MemoryLogReporter
beforeAll(() => reporter = configForTest().reporter)

test('needs to register route for /', () => {
  app.start()
  assertLog(reporter,
    `(NOTICE) application starts`,
    `(ERROR) route '/' is required`,
    `(ERROR) route '/error' is required`
  )
})
