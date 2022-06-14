import type { MemoryLogReporter } from '@just-web/log'
import { a } from 'assertron'
import { some } from 'satisfier'

export function logEqual(reporter: MemoryLogReporter, expectedMessage: string, ...expectedMessages: string[]): void
export function logEqual(reporter: MemoryLogReporter, ...expectedMessages: string[]) {
  expect(reporter.getLogMessageWithLevel()).toEqual(expectedMessages.join('\n'))
}

export function logMatchSome(reporter: MemoryLogReporter, expectedMessage: string, ...expectedMessages: string[]): void
export function logMatchSome(reporter: MemoryLogReporter, ...expectedMessages: string[]) {
  const msgs = reporter.getLogMessageWithLevel().split('\n')
  expectedMessages.forEach(e => a.satisfies(msgs, some(e)))
}
