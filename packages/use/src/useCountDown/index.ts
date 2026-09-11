import { ref } from 'vue'

export interface UseCountDownOptions {
  /**
   * 每次倒计时值变化时触发，包括初始值和最终的 0
   */
  onChange?: (count: number) => void

  /**
   * 倒计时结束时触发
   */
  onFinish?: () => void
}

export function useCountDown(start: number = 60, options: UseCountDownOptions = {}) {
  const countRef = ref(0)
  let timer: any

  const trigger = (st: number = start) => {
    clearTimeout(timer)

    let loop: any
    ;(loop = (count: number) => {
      count = Math.max(count, 0)

      countRef.value = count
      options.onChange?.(count)

      if (count <= 0) {
        options.onFinish?.()
        return
      }
      timer = setTimeout(loop, 1000, count - 1)
    })(st)
  }

  return [countRef, trigger] as const
}
