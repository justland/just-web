import type { ModuleError } from 'iso-error'
import { stub } from 'type-plus'
import { errorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'

test('capture error', () => {
  const ctx: registerOnErrorHandler.Ctx = { window: {} } as any
  registerOnErrorHandler({
    preventDefault: false
  }, stub<registerOnErrorHandler.Ctx>(ctx))

  let actual: ModuleError[]

  errorStore.onChange(v => actual = v)
  ctx.window.onerror!('some error occurred')

  expect(actual!.length).toBe(1)
  expect(actual![0].message).toBe('some error occurred')
})
