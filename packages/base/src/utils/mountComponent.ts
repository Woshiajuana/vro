import { type Component, createApp } from 'vue'

export function mountComponent(component: Component, props?: any) {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const instance = createApp(component, props)
  instance.mount(root)

  const destroy = () => {
    instance.unmount()
    document.body.removeChild(root)
  }

  return { instance, destroy }
}
