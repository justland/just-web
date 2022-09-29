import { createTestLogContext } from '@just-web/log'
import { createEventsContext, justEvent } from '.'

it('can create just event', () => {
  const addEvent = justEvent('add')

  const { emitter } = createEventsContext(
    createTestLogContext()
  )
  let called = false
  addEvent.listenTo(emitter, () => called = true)
  addEvent.emitBy(emitter)

  expect(called).toBe(true)
})
