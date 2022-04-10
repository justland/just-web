import { stub } from 'type-plus'
import { createErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'

test('capture error', () => {
  const ctx = stub<registerOnErrorHandler.Ctx>({ window: {} })
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: false
  }, ctx)

  let actual: Error[]

  errors.onChange(v => actual = v)
  ctx.window.onerror!('some error occurred')

  expect(actual!.length).toBe(1)
  expect(actual![0].message).toBe('some error occurred')
})
