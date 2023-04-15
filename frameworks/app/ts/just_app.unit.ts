import { range } from 'ramda'
import { record } from 'type-plus'
import { justApp } from './just_app.js'

it('randomize the app id', async () => {
	const ids = await Promise.all(
		range(0, 100).map(async () => (await justApp({ name: 'random' }).create()).id)
	)

	const x = ids.reduce((p, v) => ((p[v] = true), p), record())

	expect(Object.keys(x).length).toBe(100)
})
