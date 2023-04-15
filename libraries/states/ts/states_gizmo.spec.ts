import { idGizmoFn } from '@just-web/id'
import { logGizmoFn, logLevels } from '@just-web/log'
import { logTestGizmoFn } from '@just-web/log/testing'
import { incubate } from '@unional/gizmo'
import { statesGizmo } from './index.js'

it('can create state', async () => {
	const { states } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn())
		.with(statesGizmo)
		.create()
	const [value] = states.createState(0)
	expect(value).toEqual(0)
})

it('can create state with meta', async () => {
	const { states, log } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logTestGizmoFn({ logLevel: logLevels.all }))
		.with(statesGizmo)
		.create()

	const [, set] = states.createState(0, { logger: log.getLogger('state') })
	set(1)

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:state (PLANCK) state changed: 0 1'])
})

it('can create store', async () => {
	const { states } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn())
		.with(statesGizmo)
		.create()

	const store = states.createStore(0)
	expect(store.get()).toEqual(0)
})

it('can create store with meta', async () => {
	const { states, log } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logTestGizmoFn({ logLevel: logLevels.all }))
		.with(statesGizmo)
		.create()

	const store = states.createStore(0, { logger: log.getLogger('store') })
	store.set(1)

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
		'test:store (TRACE) new onChange handler: v => state.[0] = v',
		'test:store (PLANCK) state changed: 0 1'
	])
})

it('can create registry', async () => {
	const { states } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn())
		.with(statesGizmo)
		.create()

	const registry = states.createRegistry()
	expect(registry).toBeDefined()
})

it('can create registry with meta', async () => {
	const { states, log } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logTestGizmoFn({ logLevel: logLevels.all }))
		.with(statesGizmo)
		.create()

	const registry = states.createRegistry({ a: 1 }, { logger: log.getLogger('registry') })
	registry.set(v => {
		v.b = 2
	})

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
		'test:registry (TRACE) new onChange handler: v => state.[0] = v',
		'test:registry (PLANCK) state changed: { a: 1 } { a: 1, b: 2 }'
	])
})
