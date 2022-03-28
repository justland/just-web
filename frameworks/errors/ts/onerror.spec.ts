import { createState } from '@just-web/states'
import type { ModuleError } from 'iso-error'
import { stub } from 'type-plus'
import { registerOnErrorHandler } from './onerror'

test('capture error', () => {
  const [errors, setErrors, onChange] = createState<ModuleError[]>([])

  const ctx: registerOnErrorHandler.Ctx = { window: {} } as any
  registerOnErrorHandler({
    errors,
    setErrors,
    preventDefault: false
  }, stub<registerOnErrorHandler.Ctx>(ctx))

  let actual: ModuleError[]

  onChange(v => actual = v)
  ctx.window.onerror!('some error occurred')

  expect(actual!.length).toBe(1)
  expect(actual![0].message).toBe('some error occurred')
})
