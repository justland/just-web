import { ReadonlyContext } from '@just-web/contexts'

let ctx: ReadonlyContext

export function setContext(context: ReadonlyContext) { ctx = context }
export function getContext() { return ctx }
