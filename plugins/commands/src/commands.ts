import { command } from './command.js'

export const showCommandPalette = command({
	id: 'just-web.showCommandPalette',
	commandPalette: false,
	key: 'ctrl+k',
	mac: 'cmd+k'
})
