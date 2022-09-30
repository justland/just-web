import { defineInitialize } from '.'

describe('defineInitialize()', () => {
  it('accepts async function returning a PluginContext', async () => {
    const i = defineInitialize(async () => ([{ a: 1 }]))
    expect(await i({})).toEqual([{ a: 1 }])
  })

  it('accepts async function returns a PluginContext and a StartContext', async () => {
    const i = defineInitialize(async () => ([{ a: 1 }, { b: 2 }]))
    expect(await i({})).toEqual([{ a: 1 }, { b: 2 }])
  })

  it('accepts async fucntion returns no PluginContext and a StartContext', async () => {
    const i = defineInitialize(async () => ([undefined, { b: 2 }]))
    expect(await i({})).toEqual([undefined, { b: 2 }])
  })

  it('accepts async function returns no context', async () => {
    const i = defineInitialize(async () => ([]))
    expect(await i({})).toEqual([])
  })
})
