import { Context } from '@just-web/contexts'

let ctx: Context

export function setContext(context: Context) { ctx = context }
export function getContext() { return ctx }
