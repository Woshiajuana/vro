import { type AppContext, type Component, createVNode, render } from 'vue'

export function renderComponent(
  component: Component,
  props: any = {},
  appContext: AppContext | null = null,
) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(component, props)
  vnode.appContext = appContext
  render(vnode, container)

  const destroy = () => {
    render(null, container)
    document.body.removeChild(container)
  }

  return {
    instance: vnode.component!,
    destroy,
  }
}
