import logPlugin from '@just-web/log'
import eventsPlugin, { justEvent } from '.'

it('can create just event', async () => {
  const addEvent = justEvent('add')
  const [ctx] = await logPlugin.initForTest()
  const [{ emitter }] = await eventsPlugin.init(ctx)

  let called = false
  addEvent.listenTo(emitter, () => called = true)
  addEvent.emitBy(emitter)

  expect(called).toBe(true)
})
