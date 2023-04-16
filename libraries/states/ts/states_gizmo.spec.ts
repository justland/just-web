import { logLevels } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { a } from 'assertron'
import { statesGizmo } from './index.js'

it('can create state', async () => {
	const { states } = await justTestApp().with(statesGizmo).create()
	const [value] = states.createState(0)
	expect(value).toEqual(0)
})

it('can create state with meta', async () => {
	const { id, states, log } = await justTestApp({ log: { logLevel: logLevels.all } })
		.with(statesGizmo)
		.create()

	const [, set] = states.createState(0, { logger: log.getLogger('state') })
	set(1)

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
		`test (INFO) created (id: ${id})`,
		'test:state (PLANCK) state changed: 0 1'])
})

it('can create store', async () => {
	const { states } = await justTestApp().with(statesGizmo).create()

	const store = states.createStore(0)
	expect(store.get()).toEqual(0)
})

it('can create store with meta', async () => {
	const { states, log, id } = await justTestApp({ log: { logLevel: logLevels.all } })
		.with(statesGizmo)
		.create()

	const store = states.createStore(0, { logger: log.getLogger('store') })
	store.set(1)

	a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), [
		`test (INFO) created (id: ${id})`,
		/test:store \(TRACE\) new onChange handler:/,
		'test:store (PLANCK) state changed: 0 1'
	])
})

it('can create registry', async () => {
	const { states } = await justTestApp().with(statesGizmo).create()

	const registry = states.createRegistry()
	expect(registry).toBeDefined()
})

it('can create registry with meta', async () => {
	const { states, log, id } = await justTestApp({ log: { logLevel: logLevels.all } })
		.with(statesGizmo)
		.create()

	const registry = states.createRegistry({ a: 1 }, { logger: log.getLogger('registry') })
	registry.set(v => {
		v.b = 2
	})

	a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), [
		`test (INFO) created (id: ${id})`,
		/test:registry \(TRACE\) new onChange handler:/,
		'test:registry (PLANCK) state changed: { a: 1 } { a: 1, b: 2 }'
	])
})
