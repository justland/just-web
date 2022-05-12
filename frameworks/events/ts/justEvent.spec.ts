import { createEventsContext, justEvent } from '.'

it('can create just event', () => {
  const addEvent = justEvent('add')

  const { emitter } = createEventsContext()
  let called = false
  addEvent.listenTo(emitter, () => called = true)
  addEvent.emitBy(emitter)

  expect(called).toBe(true)
})
