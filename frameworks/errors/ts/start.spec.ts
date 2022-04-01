import { createStore } from '@just-web/states'
import { ModuleError } from 'iso-error'
import * as onerror from './onerror'
import { start } from './start'

jest.mock('./onerror')

test('by default browser error prevent default is true', async () => {
  const errors = createStore<ModuleError[]>([])
  await start({ errors })

  expect(onerror.registerOnErrorHandler).toBeCalledWith({
    errors,
    preventDefault: true
  })
})
