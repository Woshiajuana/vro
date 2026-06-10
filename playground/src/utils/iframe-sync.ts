import { nextTick, ref, watch } from 'vue'
import type { Router } from 'vue-router'

let queue: Array<() => void> = []
let isIframeReady = false

const iframeReady = (callback: () => void) => {
  if (isIframeReady) {
    callback()
    return
  }

  queue.push(callback)
}

if (window.top === window) {
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'iframeReady') {
      isIframeReady = true
      queue.forEach((callback) => callback())
      queue = []
    }
  })
} else {
  window.top?.postMessage({ type: 'iframeReady' }, '*')
}

const getCurrentPath = (router: Router) => router.currentRoute.value.path

export const syncPathToParent = (router: Router) => {
  window.top?.postMessage(
    {
      type: 'replacePath',
      value: getCurrentPath(router),
    },
    '*',
  )
}

export const syncPathToChild = (router: Router) => {
  const iframe = document.querySelector('iframe')
  if (!iframe?.contentWindow) {
    return
  }

  iframeReady(() => {
    iframe.contentWindow?.postMessage(
      {
        type: 'replacePath',
        value: getCurrentPath(router).replace(/^\/docs/, '/demo'),
      },
      '*',
    )
  })
}

export const listenToSyncPath = (router: Router, mode: 'desktop' | 'mobile') => {
  window.addEventListener('message', (event) => {
    if (event.data?.type !== 'replacePath') {
      return
    }

    const path = String(event.data?.value || '')
    const nextPath = mode === 'desktop' ? path.replace(/^\/demo/, '/docs') : path

    if (router.currentRoute.value.path !== nextPath) {
      router.replace(nextPath).catch(() => {})
    }
  })
}

export const useIframePathSync = (router: Router, mode: 'desktop' | 'mobile') => {
  listenToSyncPath(router, mode)

  watch(
    router.currentRoute,
    () => {
      nextTick(() => {
        if (mode === 'desktop') {
          syncPathToChild(router)
        } else {
          syncPathToParent(router)
        }
      })
    },
    { immediate: true },
  )
}

export const useWindowScroll = () => {
  const scrollTop = ref(window.scrollY)
  const windowHeight = ref(window.innerHeight)

  const onScroll = () => {
    scrollTop.value = window.scrollY
  }

  const onResize = () => {
    windowHeight.value = window.innerHeight
  }

  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)

  return {
    scrollTop,
    windowHeight,
    dispose: () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    },
  }
}
