import { Doc } from '../docs/types'

export interface DocView {
  type: 'doc',
  id: string,
  doc: Doc
}

export type View = DocView

