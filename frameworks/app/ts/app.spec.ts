import { configForTest, MemoryLogReporter } from 'standard-log'
import { app } from './app'
import { assertLog } from './assertLog'

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
