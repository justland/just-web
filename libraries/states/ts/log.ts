import { getLogger, type Logger } from '@just-web/log'

let stateLog: Logger
export function getDefaultLogger() {
	if (!stateLog) stateLog = getLogger('@just-web/states')
	return stateLog
}
