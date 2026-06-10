import { ref } from 'vue'
import type { Router } from 'vue-router'

export type Theme = 'light' | 'dark'

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

const getCurrentDir = () => {
  const router = window.vueRouter
  const { path } = router.currentRoute.value

  return path
}

export const syncPathToParent = () => {
  window.top?.postMessage(
    {
      type: 'replacePath',
      value: getCurrentDir(),
    },
    '*',
  )
}

export const syncPathToChild = () => {
  const iframe = document.querySelector('iframe')
  if (!iframe?.contentWindow) {
    return
  }

  iframeReady(() => {
    iframe.contentWindow?.postMessage(
      {
        type: 'replacePath',
        value: getCurrentDir(),
      },
      '*',
    )
  })
}

export const syncThemeToChild = (theme: Theme) => {
  const iframe = document.querySelector('iframe')
  if (!iframe?.contentWindow) {
    return
  }

  iframeReady(() => {
    iframe.contentWindow?.postMessage(
      {
        type: 'updateTheme',
        value: theme,
      },
      '*',
    )
  })
}

export const getDefaultTheme = (): Theme => {
  const cache = window.localStorage.getItem('vantTheme')
  if (cache === 'light' || cache === 'dark') {
    return cache
  }

  const useDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return useDark ? 'dark' : 'light'
}

export const useCurrentTheme = () => {
  const theme = ref<Theme>(getDefaultTheme())

  window.addEventListener('message', (event) => {
    if (event.data?.type !== 'updateTheme') {
      return
    }

    const newTheme = event.data?.value
    if (newTheme === 'light' || newTheme === 'dark') {
      theme.value = newTheme
    }
  })

  return theme
}

export const listenToSyncPath = (router: Router) => {
  window.addEventListener('message', (event) => {
    if (event.data?.type !== 'replacePath') {
      return
    }

    const path = String(event.data?.value || '')

    if (router.currentRoute.value.path !== path) {
      router.replace(path).catch(() => {})
    }
  })
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
