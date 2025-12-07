import { expect, it } from 'vitest'

import { getUserPreference } from './index.js'
import { setupMemoryPreferencesTestApp } from './preferences_gizmo.mocks.js'

it('can use register syntax to register the commands', async () => {
	const app = await setupMemoryPreferencesTestApp()
	expect.assertions(2)
	app.commands.handlers.register(
		getUserPreference.id,
		getUserPreference.defineHandler(key => {
			expect(key).toEqual('some-unique-id')
			return '{ a: 1 }'
		})
	)

	expect(app.preferences.get('some-unique-id')).toEqual('{ a: 1 }')
})
