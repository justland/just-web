# Host Gizmo

```ts
import { hostGizmoFn } from '@just-web/host'

const app = await justApp()
  .with(hostGizmoFn({ global: {} }))
  .start()

const featureGizmo = define({
  static: define.require(HostGizmo),
  async create(ctx) {
    const s = ctx.host.store('value')
    const store = ctx.globalStore.getStore(init, 'always-create')
    ctx.host.featureStore = new Map()

  }
})

```
