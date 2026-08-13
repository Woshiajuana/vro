import { nextTick, ref } from 'vue'

export interface UseVroCircleProgressOptions {
  duration?: number
  progress?: number
}

const DEFAULT_PROGRESS = 100
const DEFAULT_DURATION = 10 * 1000

const afterPaint = async (callback: () => void) => {
  await nextTick()
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

export function useVroCircleProgress(options: UseVroCircleProgressOptions = {}) {
  const initialProgress = options.progress ?? DEFAULT_PROGRESS
  const initialDuration = options.duration ?? DEFAULT_DURATION

  const progress = ref(initialProgress)
  const duration = ref(initialDuration)

  const reset = () => {
    duration.value = 0
    progress.value = DEFAULT_PROGRESS
  }

  const start = (options: UseVroCircleProgressOptions = {}) => {
    reset()

    afterPaint(() => {
      duration.value = options.duration ?? initialDuration
      progress.value = options.progress ?? 0
    })
  }

  return {
    progress,
    duration,
    start,
    reset,
  }
}
