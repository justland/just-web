import plugin from '.'

describe(`browser.${plugin.init.name}()`, () => {
  it('can omit options', () => {
    const [{ browser }] = plugin.init({})

    expect(browser.errors).toBeDefined()
  })
})
