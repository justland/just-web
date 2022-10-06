import { logLevels, logTestPlugin } from '@just-web/log'
import { a } from 'assertron'
import { startsWith } from 'satisfier'
import { createErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'
import { ctx } from './onerror.ctx'

it('captures error', () => {
  ctx.window = {} as any
  const [{ log }] = logTestPlugin().init()
  const errors = createErrorStore()
  let actual: Error[]
  errors.onChange(v => actual = v)

  registerOnErrorHandler({
    errors,
    log,
    preventDefault: true
  })
  ctx.window.onerror!('some error occurred')

  expect(actual!.length).toBe(1)
  expect(actual![0].message).toBe('some error occurred')
})

it('logs captured error', () => {
  ctx.window = {} as any
  const [{ log }] = logTestPlugin().init()
  const errors = createErrorStore()

  registerOnErrorHandler({
    errors,
    log,
    preventDefault: true
  })
  ctx.window.onerror!('some error occurred')

  a.satisfies(log.reporter.logs, [{
    id: 'test:@just-web/browser',
    level: logLevels.error,
    args: startsWith(['onerror detected'])
  }])
})
