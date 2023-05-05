import { testType } from 'type-plus'
import { justApp, type IdGizmo, type LogGizmo } from './index.js'

it('infers blank JustApp', () => {
	const app = justApp({ name: 'test' })
	type A = justApp.Infer<typeof app>
	testType.equal<A, IdGizmo & LogGizmo>(true)
})

it('infers JustApp with a gizmo', () => {
	const app = justApp({ name: 'test' }).merge({ foo: 'bar' })
	type A = justApp.Infer<typeof app>
	testType.equal<A, IdGizmo & LogGizmo & { foo: string }>(true)
})
