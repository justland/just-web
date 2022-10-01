import { BrowserContext } from '@just-web/browser'
import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'

export type BrowserContributionsInitContext = LogContext & CommandsContext & ContributionsContext & BrowserContext
export type BrowserContributionsStartContext = BrowserContributionsInitContext
