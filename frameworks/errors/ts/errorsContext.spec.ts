import { stub } from 'type-plus'
import { createErrorsContext } from './errorsContext'
import { registerOnErrorHandler } from './onerror'

test('by default browser error prevent default is false', () => {
  const ctx = stub<registerOnErrorHandler.Ctx>({ window: {} })
  registerOnErrorHandler.ctx = ctx

  createErrorsContext()
  const a = ctx.window.onerror!('some error occurred')
  expect(a).toBe(false)
})

test('set preventDefault to true', () => {
  const ctx = stub<registerOnErrorHandler.Ctx>({ window: {} })
  registerOnErrorHandler.ctx = ctx

  createErrorsContext({ preventDefault: true })
  const a = ctx.window.onerror!('some error occurred')
  expect(a).toBe(true)
})

test('cannot add error directly to the module', () => {
  const m = createErrorsContext()
  const keys = Object.keys(m)
  expect(keys).not.toContain('set')
  expect(keys).not.toContain('add')
  expect(keys).not.toContain('update')
  expect(keys).not.toContain('reset')
})
