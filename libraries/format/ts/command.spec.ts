import { formatCommand } from './command'

describe('formatCommand()', () => {
  const allDefinedCommand = {
    command: 'app.someCommand',
    name: 'Sing a song',
    description: 'Jingle Bell'
  }
  test('use defined name', () => {
    const a = formatCommand(allDefinedCommand)

    expect(a).toEqual({
      command: 'app.someCommand',
      name: 'Sing a song',
      description: 'Jingle Bell'
    })
  })

  test('create name from command as sentence case, skipping first category', () => {
    const a = formatCommand({ command: 'app.miku.singASong' })

    expect(a).toEqual({
      command: 'app.miku.singASong',
      name: 'Miku sing a song',
      description: undefined
    })
  })
})
