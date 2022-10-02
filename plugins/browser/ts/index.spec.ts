import plugin from '.'

describe(`default().init()`, () => {
  it('can omit options', () => {
    const [{ browser }] = plugin().init({})

    expect(browser.errors).toBeDefined()
  })
})
