import { stub } from 'type-plus'
import { errors } from './errors'
import { registerOnErrorHandler } from './onerror'

test('capture error', () => {
  const ctx: registerOnErrorHandler.Ctx = { window: {} } as any
  registerOnErrorHandler(false, stub<registerOnErrorHandler.Ctx>(ctx))

  ctx.window.onerror!('some error occurred')

  expect(errors.length).toBe(1)
  expect(errors[0].message).toBe('some error occurred')
})
