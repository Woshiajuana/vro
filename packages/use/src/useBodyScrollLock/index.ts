import type { Ref } from 'vue'
import { onBeforeUnmount, watchEffect } from 'vue'

// 全局状态（单例）
let lockCount = 0
let originalOverflow = ''

/**
 * 锁定/解锁 body 滚动
 * @param locked - 响应式布尔值，true 锁定滚动，false 解锁
 */
export function useBodyScrollLock(locked: Ref<boolean>) {
  // 组件卸载时强制解锁（减少计数）
  onBeforeUnmount(() => {
    if (typeof document === 'undefined') return
    if (locked.value) {
      // 如果当前是锁定状态，需要减少计数并可能恢复
      unlock()
    }
    // 注意：如果 locked.value 为 false，说明已经解锁过，无需额外操作
  })

  watchEffect(() => {
    if (typeof document === 'undefined') return

    if (locked.value) {
      lock()
    } else {
      unlock()
    }
  })

  function lock() {
    if (lockCount === 0) {
      // 只有第一个锁需要保存原始样式并设置 hidden
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
  }

  function unlock() {
    if (lockCount <= 0) return // 防御
    lockCount--
    if (lockCount === 0) {
      // 所有锁都释放，恢复原始样式
      document.body.style.overflow = originalOverflow
      originalOverflow = '' // 清理
    }
  }
}
