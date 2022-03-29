import { start } from './start'
import * as onerror from './onerror'

jest.mock('./onerror')

test('by default browser error prevent default is true', async () => {
  await start()

  expect(onerror.registerOnErrorHandler).toBeCalledWith({ preventDefault: true })
})
