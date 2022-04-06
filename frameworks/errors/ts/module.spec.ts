import { create } from './module'
import * as onerror from './onerror'

jest.mock('./onerror')

test('by default browser error prevent default is true', () => {
  const errors = create()

  expect(onerror.registerOnErrorHandler).toBeCalledWith({
    errors,
    preventDefault: true
  })
})
