import { createMemoryLogReporter, logLevels } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { startsWith } from 'satisfier'
import { configGlobal } from 'standard-log'
import { createErrorStore } from './error_store.js'
import { throwBrowserError } from './errors.testing.js'
import { registerOnErrorHandler } from './onerror.js'

it('captures error', async () => {
	const { log } = await justTestApp().create()
	const errors = createErrorStore()
	let actual: Error[]
	errors.onChange(v => (actual = v))

	registerOnErrorHandler(
		{
			errors,
			preventDefault: true
		},
		{ log }
	)

	await throwBrowserError()

	expect(actual!.length).toBe(1)
	expect(actual![0]?.message).toBe('some error occurred')
})

it('logs captured error', async () => {
	const { log } = await justTestApp().create()
	const errors = createErrorStore()

	registerOnErrorHandler(
		{
			errors,
			preventDefault: true
		},
		{ log }
	)
	await throwBrowserError()

	a.satisfies(
		log.reporter.logs,
		some({
			id: 'test:@just-web/browser',
			level: logLevels.error,
			args: startsWith(['onerror detected'])
		})
	)
})


it('accepts a logger meta', async () => {
	const app = await justTestApp().create()
	const logger = app.log.getLogger('browser')
	const errors = createErrorStore()
	registerOnErrorHandler(
		{
			errors,
			preventDefault: false
		},
		{ logger }
	)

	await throwBrowserError()

	a.satisfies(
		app.log.reporter.getLogMessagesWithIdAndLevel(),
		some(/test:browser \(ERROR\) onerror detected BrowserError: some error occurred/)
	)
})

it('uses @just-web/browser logger if not specified', async () => {

	const reporter = createMemoryLogReporter()
	configGlobal({
		reporters: [reporter]
	})
	await justTestApp().create()
	const errors = createErrorStore()
	registerOnErrorHandler({
		errors,
		preventDefault: false
	})

	await throwBrowserError()

	a.satisfies(
		reporter.getLogMessagesWithIdAndLevel(),
		some(/@just-web\/browser \(ERROR\) onerror detected BrowserError: some error occurred/)
	)
})
