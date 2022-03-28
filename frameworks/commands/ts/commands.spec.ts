import { enableMapSet } from '@just-web/states'
import { assertLog } from '@just-web/testing'
import { configForTest, MemoryLogReporter } from 'standard-log'
import { compose, stub } from 'type-plus'
import {
  activate, clearCommands, CommandRegistration,
  getCommands, invokeCommand, registerCommand
} from '.'

let reporter: MemoryLogReporter

beforeAll(enableMapSet)

beforeEach(compose(() => reporter = configForTest().reporter, clearCommands))


describe('registerCommand()', () => {
  test('can register before activate()', () => {
    registerCommand('command1', stub<CommandRegistration>())
    const cmds = getCommands()
    expect(cmds.size).toBe(1)
  })
  describe('after activate()', () => {
    beforeEach(activate)
    test('register a command', () => {
      registerCommand('just-web.commandPalette', {
        description: 'Open Command Palette',
        handler() { }
      })
    })

    test('log a warning if registering with existing id', () => {
      registerCommand('command1', stub<CommandRegistration>())
      registerCommand('command1', stub<CommandRegistration>())
      assertLog(reporter, `(WARN) Registering an already registered command: 'command1'`)
    })
  })
})

describe('getCommands()', () => {
  test('return empty Map before activate', () => {
    const cmds = getCommands()
    expect(cmds.size).toBe(0)
  })
  describe('after activate()', () => {
    beforeEach(activate)

    test('empty at the beginning', () => {
      const cmds = getCommands()
      expect(cmds.size).toEqual(0)
    })

    test('get registered commands', () => {
      registerCommand('cmd1', stub<CommandRegistration>())
      registerCommand('cmd2', stub<CommandRegistration>())
      const cmds = getCommands()
      expect(Array.from(cmds.values())).toEqual([{ id: 'cmd1' }, { id: 'cmd2' }])
    })
  })
})

describe('invokeCommand()', () => {
  describe('after activate()', () => {
    beforeEach(activate)
    test('invoke not registered command emits an error', () => {
      invokeCommand('not-exist')

      assertLog(reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
    })

    test('invoke command', () => {
      const cmd = stub<CommandRegistration>({ handler: jest.fn() })
      registerCommand('command1', cmd)
      invokeCommand('command1')
      expect(cmd.handler).toHaveBeenCalledTimes(1)
    })
  })
})

