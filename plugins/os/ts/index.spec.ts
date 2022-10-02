import plugin from '.'

describe(`default().init()`, () => {
  it('adds `os` to the applcation', () => {
    const [{ os }] = plugin().init({})

    expect(os.isMac).toBeDefined()
  })
})
