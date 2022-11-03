import { createMemoryLogReporter } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { a } from 'assertron'
import { range } from 'ramda'
import { record } from 'type-plus'
import { createApp } from './createApp'

describe(createApp.name, () => {
  it('randomize the app id', () => {
    const x = range(0, 100)
      .map(() => createApp({ name: 'random' }).id)
      .reduce((p, v) => (p[v] = true, p), record())

    expect(Object.keys(x).length).toBe(100)
  })

  it('will starts only newly extended plugins within that sub-tree', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

    app.extend(definePlugin(() => ({
      name: 'dummy-a', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-b', init() { },
      async start() { }
    }))())

    await app.start()

    // @todo should not start plugin on another tree branch
    // but right now this contradicts with the start-whole-tree design.
    // maybe need to do this only if the app has previously started.
    // but then also need to handle the case when the new `start()` is made from the original app.
    app.extend(definePlugin(() => ({
      name: 'dummy-c', init() { },
      async start() { }
    }))())

    const app2 = app.extend(definePlugin(() => ({
      name: 'dummy-d', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-e', init() { },
      async start() { }
    }))())
    await app2.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      'test-app (NOTICE) initializing dummy-a',
      'test-app (NOTICE) initializing dummy-b',
      'test-app (NOTICE) starting dummy-a',
      'test-app (NOTICE) starting dummy-b',
      /test-app \(INFO\) starting \(id: .*\)/,
      'test-app (NOTICE) initializing dummy-c',
      'test-app (NOTICE) initializing dummy-d',
      'test-app (NOTICE) initializing dummy-e',
      'test-app (NOTICE) starting dummy-c',
      'test-app (NOTICE) starting dummy-d',
      'test-app (NOTICE) starting dummy-e',
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })
})
