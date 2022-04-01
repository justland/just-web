import { createStore } from '@just-web/states'
import { ModuleError } from 'iso-error'
import { stub } from 'type-plus'
import { registerOnErrorHandler } from './onerror'

test('capture error', () => {
  const ctx: registerOnErrorHandler.Ctx = { window: {} } as any
  const errors = createStore<ModuleError[]>([])
  registerOnErrorHandler({
    errors,
    preventDefault: false
  }, stub<registerOnErrorHandler.Ctx>(ctx))

  let actual: ModuleError[]

  errors.onChange(v => actual = v)
  ctx.window.onerror!('some error occurred')

  expect(actual!.length).toBe(1)
  expect(actual![0].message).toBe('some error occurred')
})
