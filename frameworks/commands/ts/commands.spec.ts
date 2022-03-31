import { assertLog } from '@just-web/testing'
import { configForTest, MemoryLogReporter } from 'standard-log'
import { compose } from 'type-plus'
import {
  activate, clearCommands,
  getCommands, invokeCommand, registerCommand
} from '.'

let reporter: MemoryLogReporter

beforeEach(compose(() => reporter = configForTest().reporter, clearCommands))


describe('registerCommand()', () => {
  test('can register before activate()', () => {
    registerCommand('command1', () => { })
    const cmds = getCommands()
    expect(Object.keys(cmds).length).toBe(1)
  })
  describe('after activate()', () => {
    beforeEach(activate)
    test('register a command', () => {
      registerCommand('just-web.commandPalette', () => { })
    })

    test('log a warning if registering with existing id', () => {
      registerCommand('command1', () => { })
      registerCommand('command1', () => { })
      assertLog(reporter, `(WARN) Registering an already registered command: 'command1'`)
    })
  })
})

describe('getCommands()', () => {
  test('return empty Map before activate', () => {
    const cmds = getCommands()
    expect(Object.keys(cmds).length).toBe(0)
  })
  describe('after activate()', () => {
    beforeEach(activate)

    test('empty at the beginning', () => {
      const cmds = getCommands()
      expect(Object.keys(cmds).length).toEqual(0)
    })

    test('get registered commands', () => {
      registerCommand('cmd1', () => { })
      registerCommand('cmd2', () => { })
      const cmds = getCommands()
      expect(Object.keys(cmds)).toEqual(['cmd1', 'cmd2'])
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
      const fn = jest.fn()
      registerCommand('command1', fn)
      invokeCommand('command1')
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})

