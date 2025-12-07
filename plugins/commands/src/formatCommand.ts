import { sentenceCase } from 'sentence-case'
import type { CommandContribution } from './types.js'

export function formatCommand(cmd: CommandContribution) {
	return {
		id: cmd.id,
		title: cmd.title ?? generateTitle(cmd.id),
		description: cmd.description
	}
}

function generateTitle(command: string) {
	const i = command.indexOf('.')
	return sentenceCase(command.slice(i))
}
