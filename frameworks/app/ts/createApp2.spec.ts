import { createMemoryLogReporter, LogContext, LogMethodNames } from '@just-web/log'
import { CanAssign, isType } from 'type-plus'
import { createApp2 } from './createApp2'
import { a } from 'assertron'

describe(createApp2.name, () => {
  it('needs name', () => {
    const app = createApp2({ name: 'some app' })

    expect(app.name).toEqual('some app')
  })

  it('generates an 15 chars long app id', () => {
    const app = createApp2({ name: 'test' })

    expect(app.id.length).toEqual(15)
  })

  it('comes with log', () => {
    const app = createApp2({ name: 'test' })

    isType.t<CanAssign<typeof app, LogContext<LogMethodNames>>>()
  })

  it('the log id is the app name', () => {
    const reporter = createMemoryLogReporter()
    const app = createApp2({ name: 'test-app', log: { reporters: [reporter] } })
    app.log.info('hello')

    a.satisfies(reporter.logs, [{ id: 'test-app', args: ['hello'] }])
  })
})
