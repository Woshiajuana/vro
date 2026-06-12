import type { AppContext, Component } from 'vue'

import { renderComponent } from './renderComponent'

export function showComponent<
  T extends Component,
  P = T extends { new (): { $props: infer Props } } ? Props : Record<string, any>,
>(component: T, props: Partial<P>, appContext: AppContext | null = null) {
  return new Promise<any>((resolve, reject) => {
    const { destroy, instance } = renderComponent(
      component,
      {
        ...props,
        onClosed: () => destroy(),
      },
      appContext ??
        (component as any)._context ??
        (window as any).app?._context ??
        (window as any)._app?._context,
    )

    ;(instance.exposed as any).show(props).then(resolve).catch(reject)
  })
}
