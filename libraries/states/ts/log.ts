import { getLogger, type Logger } from '@just-web/app'

let stateLog: Logger
export function getDefaultLogger() {
	if (!stateLog) stateLog = getLogger('@just-web/states')
	return stateLog
}
