import type { Logger, LoggerOptions, LogMethodNames, StandardLog, StandardLogOptions } from 'standard-log'

export type LogGizmoOptions<N extends string = LogMethodNames> = StandardLogOptions<N>

export type GizmoStandardLog<N extends string = LogMethodNames> = Omit<StandardLog<N>, 'getLogger'> &
	Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'> & {
		getLogger(id?: string, options?: LoggerOptions): Logger<LogMethodNames | N>
	}
