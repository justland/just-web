import plugin from '.'

describe(`os.${plugin.init.name}()`, () => {
  it('adds `os` to the applcation', () => {
    const [{ os }] = plugin.init({})

    expect(os.isMac).toBeDefined()
  })
})
