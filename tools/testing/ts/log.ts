import { MemoryLogReporter } from '@just-web/log'

export function assertLog(reporter: MemoryLogReporter, expectedMessage: string, ...expectedMessages: string[]): void
export function assertLog(reporter: MemoryLogReporter, ...expectedMessages: string[]) {
  expect(reporter.getLogMessageWithLevel()).toEqual(expectedMessages.join('\n'))
}
