import { MemoryLogReporter } from 'standard-log'

export function assertLog(reporter: MemoryLogReporter, expectedMessage: string) {
  expect(reporter.getLogMessageWithLevel()).toEqual(expectedMessage)
}
