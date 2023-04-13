import { createMemoryLogReporter, LogContext } from '@just-web/log'
import { definePlugin, StartContext } from '@just-web/types'
import { a } from 'assertron'
import { some } from 'satisfier'
import { isType } from 'type-plus'
import { createApp, createTestApp } from './createApp.js'

describe(`${createApp.name}()`, () => {

	it('starts will log an app start message', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [/test-app \(INFO\) starting \(id: .*\)/])
	})

	it('starts will call plugin start with an adjusted log', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'test-app', log: { reporters: [reporter] } }).extend(
			definePlugin(() => ({
				name: 'dummy-plugin',
				init() {},
				// Have to declare the type here.
				// Seems to be a TypeScript bug (4.8.4)
				async start({ log }: StartContext) {
					isType.equal<false, any, typeof log>()
					log.info('inside plugin')
				}
			}))()
		)
		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
			'test-app (NOTICE) initializing dummy-plugin',
			'test-app (NOTICE) starting dummy-plugin',
			'test-app:dummy-plugin (INFO) inside plugin',
			/test-app \(INFO\) starting \(id: .*\)/
		])
	})

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

	it(`gives plugin a prefixed getLogger()`, async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'a', log: { reporters: [reporter] } }).extend(
			definePlugin(() => ({
				name: 'plugin-a',
				init: (ctx: LogContext) => {
					const log = ctx.log.getLogger('custom')
					log.info('info')
				}
			}))()
		)
		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), some('a:plugin-a:custom (INFO) info'))
	})

	it('gives plugin a prefixed getNonConsoleLogger()', async () => {
		const reporter = createMemoryLogReporter()
		const app = createApp({ name: 'a', log: { reporters: [reporter] } }).extend(
			definePlugin(() => ({
				name: 'plugin-a',
				init: (ctx: LogContext) => {
					const log = ctx.log.getNonConsoleLogger('custom')
					log.info('info')
				}
			}))()
		)
		await app.start()

		a.satisfies(reporter.getLogMessagesWithIdAndLevel(), some('a:plugin-a:custom (INFO) info'))
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

describe(`${createTestApp.name}()`, () => {
	it('can be called without param', () => {
		createTestApp()
	})

	it('provides log.reporter', () => {
		const app = createTestApp()
		app.log.info('hello')
		expect(app.log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test-app (INFO) hello'])
	})
})
