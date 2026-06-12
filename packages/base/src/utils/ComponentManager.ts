import { isFunction } from '@daysnap/utils'

type Constructor = abstract new (...args: any) => any

export type InstanceTypeProps<T extends Constructor> = InstanceType<T>['$props']

export type ComponentManagerMapValue<T extends Constructor = any> =
  | {
      is: T
      props: InstanceTypeProps<T>
    }
  | { is: string; props: Record<string, any> }

export class ComponentManager {
  map: Record<string, ComponentManagerMapValue> = {}

  add(name: string, props?: Record<string, any>): ComponentManager
  add<T extends Constructor>(name: string, is: T, props?: InstanceTypeProps<T>): ComponentManager
  add<T extends Constructor>(name: string, is?: any, props?: InstanceTypeProps<T>) {
    if (isFunction(is.setup)) {
      this.map[name] = { is, props: props ?? {} }
    } else {
      this.map[name] = { is: name, props: is ?? {} }
    }
    return this
  }

  get(name: string) {
    return this.map[name]
  }

  del(name: string) {
    delete this.map[name]
  }

  clear() {
    this.map = {}
  }
}
