import { createTestLogContext } from '@just-web/log'
import { createContext } from './context'

describe('createContext()', () => {
  test('create context without any option', () => {
    const context = createContext({ logContext: createTestLogContext() })
    expect(context.errors).toBeDefined()
    expect(context.commands).toBeDefined()
    expect(context.contributions).toBeDefined()
    expect(context.platform).toBeDefined()
  })
})
