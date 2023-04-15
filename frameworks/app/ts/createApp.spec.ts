import { createMemoryLogReporter, LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { a } from 'assertron'
import { createApp } from './createApp.js'

describe(`${createApp.name}()`, () => {
	it('call both plugins when start', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
			.extend(
				definePlugin(() => ({
					name: 'dummy-a',
					init() {
						return [undefined, { a: 1 }]
					},
					async start() {}
				}))()
			)
			.extend(
				definePlugin(() => ({
					name: 'dummy-b',
					init() {},
					async start() {}
				}))()
			)
		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
			'test-app (NOTICE) initializing dummy-a',
			'test-app (NOTICE) initializing dummy-b',
			'test-app (NOTICE) starting dummy-a',
			'test-app (NOTICE) starting dummy-b',
			/test-app \(INFO\) starting \(id: .*\)/
		])
	})

	it('calls plugin tree', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

		app
			.extend(
				definePlugin(() => ({
					name: 'dummy-a',
					init() {},
					async start() {}
				}))()
			)
			.extend(
				definePlugin(() => ({
					name: 'dummy-b',
					init() {},
					async start() {}
				}))()
			)

		app.extend(
			definePlugin(() => ({
				name: 'dummy-c',
				init() {},
				async start() {}
			}))()
		)

		app
			.extend(
				definePlugin(() => ({
					name: 'dummy-d',
					init() {},
					async start() {}
				}))()
			)
			.extend(
				definePlugin(() => ({
					name: 'dummy-e',
					init() {},
					async start() {}
				}))()
			)

		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
			'test-app (NOTICE) initializing dummy-a',
			'test-app (NOTICE) initializing dummy-b',
			'test-app (NOTICE) initializing dummy-c',
			'test-app (NOTICE) initializing dummy-d',
			'test-app (NOTICE) initializing dummy-e',
			'test-app (NOTICE) starting dummy-a',
			'test-app (NOTICE) starting dummy-b',
			'test-app (NOTICE) starting dummy-c',
			'test-app (NOTICE) starting dummy-d',
			'test-app (NOTICE) starting dummy-e',
			/test-app \(INFO\) starting \(id: .*\)/
		])
	})

	it('only calls `start()` of each plugin once', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

		const app2 = app
			.extend(
				definePlugin(() => ({
					name: 'dummy-a',
					init() {},
					async start() {}
				}))()
			)
			.extend(
				definePlugin(() => ({
					name: 'dummy-b',
					init() {},
					async start() {}
				}))()
			)

		const app3 = app.extend(
			definePlugin(() => ({
				name: 'dummy-c',
				init() {},
				async start() {}
			}))()
		)

		const app4 = app
			.extend(
				definePlugin(() => ({
					name: 'dummy-d',
					init() {},
					async start() {}
				}))()
			)
			.extend(
				definePlugin(() => ({
					name: 'dummy-e',
					init() {},
					async start() {}
				}))()
			)

		await app.start()
		// right now each of this will emit a log
		// need to detect if there are any new plugin down the tree started,
		// to determine if we should emit the extra log
		// and may be good to show which plugins/new plugins have started
		await app2.start()
		await app3.start()
		await app4.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
			'test-app (NOTICE) initializing dummy-a',
			'test-app (NOTICE) initializing dummy-b',
			'test-app (NOTICE) initializing dummy-c',
			'test-app (NOTICE) initializing dummy-d',
			'test-app (NOTICE) initializing dummy-e',
			'test-app (NOTICE) starting dummy-a',
			'test-app (NOTICE) starting dummy-b',
			'test-app (NOTICE) starting dummy-c',
			'test-app (NOTICE) starting dummy-d',
			'test-app (NOTICE) starting dummy-e',
			/test-app \(INFO\) starting \(id: .*\)/,
			/test-app \(INFO\) starting \(id: .*\)/,
			/test-app \(INFO\) starting \(id: .*\)/,
			/test-app \(INFO\) starting \(id: .*\)/
		])
	})

	it('supports plugin expecting custom log levels, but cannot enforce requirement', async () => {
		const customPlugin = definePlugin(() => ({
			name: 'custom',
			init: (ctx: LogContext<'want'>) => {
				expect(ctx.log.want).toBeDefined()
			}
		}))

		createApp({ name: 'a', log: { customLevels: { want: 1 } } }).extend(customPlugin())
	})
})
