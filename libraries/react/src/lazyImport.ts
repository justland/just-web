import { PluginModule } from '@just-web/types'
import { ComponentType, lazy } from 'react'

export function lazyImport<
  M extends { default: (...args: any[]) => PluginModule<any> },
  K extends keyof M,
  R extends { start(): Promise<void> }
>(
  importPlugin: Promise<M>,
  key: K,
  extendPlugin: (plugin: M['default']) => R
): M[K] extends ComponentType<any> ? {
  [k in K]: React.LazyExoticComponent<M[K]>
} & {
  getExtendingApp: () => Promise<R>
} : never {
  let cached: Promise<readonly [M, R]> | undefined
  function cachedExtendingApp() {
    return cached ? cached : cached = extendingApp()
  }
  async function extendingApp() {
    const m = await importPlugin
    const extendedApp = extendPlugin(m.default)
    await extendedApp.start()
    return [m, extendedApp] as const
  }

  const Component = lazy(async () => {
    const [m] = await cachedExtendingApp()
    return { default: m[key] as any }
  })

  return {
    [key]: Component,
    getExtendingApp: () => cachedExtendingApp().then(([, extendedApp]) => extendedApp)
  } as any
}
