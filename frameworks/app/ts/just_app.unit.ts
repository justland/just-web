import { range } from 'ramda'
import { record } from 'type-plus'
import { justApp } from './just_app.js'
import { createMemoryLogReporter } from '@just-web/log'

it('randomize the app id', async () => {
	const ids = await Promise.all(
		range(0, 100).map(
			async () =>
				(
					await justApp({ name: 'random', log: { reporters: [createMemoryLogReporter()] } }).create()
				).id
		)
	)

	const x = ids.reduce((p, v) => ((p[v] = true), p), record())

	expect(Object.keys(x).length).toBe(100)
})
