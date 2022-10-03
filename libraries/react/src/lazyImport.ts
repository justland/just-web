import { JustWebApp } from '@just-web/app'
import { PluginModule } from '@just-web/types'
import { ComponentType, lazy } from 'react'

export function lazyImport<
  A extends JustWebApp,
  M extends { default: () => PluginModule<A> },
  C extends ComponentType<any>
>(
  getApp: () => A,
  importPlugin: () => Promise<M>,
  getComponent: (m: M) => C
): React.LazyExoticComponent<C> {
  return lazy(async () => {
    const m = await importPlugin() as unknown as M
    getApp().extend(m.default())

    return { default: getComponent(m) }
  })
}
