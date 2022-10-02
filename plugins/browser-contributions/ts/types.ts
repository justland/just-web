import { BrowserContext } from '@just-web/browser'
import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { StartContextBase } from '@just-web/types'

export type BrowserContributionsInitContext = LogContext & CommandsContext & ContributionsContext & BrowserContext
export type BrowserContributionsStartContext = StartContextBase & CommandsContext & ContributionsContext & BrowserContext
