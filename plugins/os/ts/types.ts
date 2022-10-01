import { isMac } from './os'

export interface OSContext {
  os: {
    isMac: typeof isMac
  }
}
