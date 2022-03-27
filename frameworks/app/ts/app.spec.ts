import { configForTest, MemoryLogReporter } from 'standard-log'
import { app } from './app'
import { assertLog } from './assertLog'

let reporter: MemoryLogReporter
beforeAll(() => reporter = configForTest().reporter)

test.skip('needs to register route for /', () => {
  app.start()
  assertLog(reporter, `(ERROR) application needs to at least handle '/'`)
})
