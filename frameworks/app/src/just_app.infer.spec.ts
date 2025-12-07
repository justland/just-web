import type { LogTestGizmo } from '@just-web/log/testing'
import { testType } from 'type-plus'
import { it } from 'vitest'
import { type IdGizmo, justApp, type LogGizmo } from './index.js'
import { justTestApp } from './just_app.testing.js'

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

it('infers JustTestApp', () => {
	const app = justTestApp()
	type A = justApp.Infer<typeof app>
	testType.equal<A, IdGizmo & LogTestGizmo>(true)
})
