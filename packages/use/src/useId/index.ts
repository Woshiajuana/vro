import { getCurrentInstance } from 'vue'

let current = 0

export function useId() {
  const vm = getCurrentInstance()
  const name = typeof vm?.type === 'object' ? vm.type.name || 'unknown' : 'unknown'

  return `${name}-${++current}`
}
