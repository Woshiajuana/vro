import type { Ref } from 'vue'
import { getCurrentScope, isRef, onScopeDispose, ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export interface UseBodyScrollLockReturn {
  locked: Ref<boolean>
  lock: () => void
  unlock: () => void
  toggle: (value?: boolean) => void
}

// 全局状态（单例）
let lockCount = 0
let originalOverflow = ''

function lockBody() {
  if (typeof document === 'undefined') return

  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount++
}

function unlockBody() {
  if (typeof document === 'undefined' || lockCount <= 0) return

  lockCount--
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow
    originalOverflow = ''
  }
}

/**
 * 锁定/解锁 body 滚动
 * @param initialLocked - 初始锁定状态，或外部响应式布尔值
 */
export function useBodyScrollLock(
  initialLocked: MaybeRef<boolean> = false,
): UseBodyScrollLockReturn {
  const locked = isRef(initialLocked) ? initialLocked : ref(unref(initialLocked))
  let currentLocked = false

  const sync = (value: boolean) => {
    if (value === currentLocked) return

    if (value) {
      lockBody()
    } else {
      unlockBody()
    }

    currentLocked = value
  }

  const stop = watch(locked, sync, { immediate: true })

  const cleanup = () => {
    stop()

    if (currentLocked) {
      unlockBody()
      currentLocked = false
    }
  }

  if (getCurrentScope()) {
    onScopeDispose(cleanup)
  }

  const lock = () => {
    locked.value = true
  }

  const unlock = () => {
    locked.value = false
  }

  const toggle = (value = !locked.value) => {
    locked.value = value
  }

  return {
    locked,
    lock,
    unlock,
    toggle,
  }
}
