import plugin from '.'

describe(`os.${plugin.init.name}()`, () => {
  it('adds `os` to the applcation', async () => {
    const [{ os }] = await plugin.init({})

    expect(os.isMac).toBeDefined()
  })
})
