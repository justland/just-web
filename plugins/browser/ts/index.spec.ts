import plugin from '.'

describe(`browser.${plugin.init.name}()`, () => {
  it('can omit options', async () => {
    const [{ browser }] = await plugin.init({})

    expect(browser.errors).toBeDefined()
  })
})
