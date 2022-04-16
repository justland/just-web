import { configForTest, MemoryLogReporter } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { commandContributionRegistry } from './commands'

let reporter: MemoryLogReporter

beforeEach(() => reporter = configForTest().reporter)

describe('add()', () => {
  test('add a new command', () => {
    const store = commandContributionRegistry({ commands: {} })
    const cmd = { command: 'a', description: 'a' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })

  test('add existing command logs and error and ignore', () => {
    const store = commandContributionRegistry({ commands: {} })
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'a', description: 'a' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(reporter, '(ERROR) Registering a duplicate command contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  test('add multiple commands', () => {
    const store = commandContributionRegistry({ commands: {} })
    const cmd1 = { command: 'a', description: 'a' }
    const cmd2 = { command: 'b', description: 'b' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})
