import { MemoryLogReporter } from 'standard-log'

export function assertLog(reporter: MemoryLogReporter, ...expectedMessages: string[]) {
  expect(reporter.getLogMessageWithLevel()).toEqual(expectedMessages.join('\n'))
}
