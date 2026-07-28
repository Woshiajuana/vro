import type { AppContext, Component } from 'vue'

import type { ExtractComponentProps } from '../types'
import { renderComponent } from './renderComponent'

export interface ShowComponentOptions {
  appContext?: AppContext | null
  destroyHandlers?: string[] | false
}

export function showComponent<T extends Component, P = ExtractComponentProps<T>>(
  component: T,
  props: Partial<P>,
  options: ShowComponentOptions | null = null,
) {
  return new Promise<any>((resolve, reject) => {
    const { destroyHandlers, appContext } = options || {}

    let destroyed = false
    let destroy = () => {}

    const { destroy: destroyComponent, instance } = renderComponent(
      component,
      {
        ...props,
        ...createDestroyProps(props as Record<string, any>, destroyHandlers, () => destroy()),
      },
      resolveAppContext(component, appContext),
    )

    destroy = () => {
      if (destroyed) {
        return
      }

      destroyed = true
      destroyComponent()
    }
    ;(instance.exposed as any)
      .show(props)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        if (!destroyHandlers) {
          destroy()
        }
      })
  })
}

function resolveAppContext(component: Component, appContext?: AppContext | null) {
  return (
    appContext ??
    (component as any)._context ??
    (window as any).app?._context ??
    (window as any)._app?._context
  )
}

function createDestroyProps(
  props: Record<string, any>,
  destroyHandlers: ShowComponentOptions['destroyHandlers'],
  destroy: () => void,
) {
  return (destroyHandlers || []).reduce<Record<string, (...args: any[]) => void>>((res, key) => {
    const original = props[key]

    res[key] = (...args: any[]) => {
      original?.(...args)
      destroy()
    }

    return res
  }, {})
}
