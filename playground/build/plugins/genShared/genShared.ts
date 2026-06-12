import path from 'node:path'

import type { PluginOption, ViteDevServer } from 'vite'

import { normalizePath, PACKAGE_NAMES, PACKAGES_DIR, ROOT } from '../../utils'
import { genSharedDesktop } from './genSharedDesktop'
import { genSharedMobile } from './genSharedMobile'

const isSharedFile = (filepath: string) => {
  const normalized = normalizePath(filepath)
  const packageSrcDirs = PACKAGE_NAMES.map((packageName) =>
    normalizePath(path.join(PACKAGES_DIR, packageName, 'src')),
  )

  // 指南文档也会生成到桌面端共享路由模块中。
  if (normalized.startsWith(normalizePath(path.join(ROOT, 'src/docs')))) {
    return normalized.endsWith('.md')
  }

  // 只在影响文档或 demo 路由记录的文件变化时刷新虚拟模块。
  return (
    packageSrcDirs.some((srcDir) => normalized.startsWith(`${srcDir}/`)) &&
    (normalized.endsWith('/index.ts') ||
      normalized.endsWith('/README.md') ||
      normalized.endsWith('/demo/index.vue'))
  )
}

const reloadSharedModules = (
  server: ViteDevServer,
  resolvedModuleIds: string[],
  timestamp: number,
) => {
  resolvedModuleIds.forEach((id) => {
    const module = server.moduleGraph.getModuleById(id)

    if (module) {
      // 路由列表来自虚拟模块，Vite 无法自动推断未来新增文件与它们的依赖关系。
      server.moduleGraph.invalidateModule(module, undefined, timestamp, true)
    }
  })

  server.ws.send({ type: 'full-reload' })
}

export function GenShared(): PluginOption {
  const virtualSharedDesktopModuleId = 'virtual:shared-desktop'
  const resolvedVirtualSharedDesktopModuleId = `resolved:${virtualSharedDesktopModuleId}`

  const virtualSharedMobileModuleId = 'virtual:shared-mobile'
  const resolvedVirtualSharedMobileModuleId = `resolved:${virtualSharedMobileModuleId}`

  return {
    name: 'vro:shared',
    enforce: 'pre',

    resolveId(id) {
      if (id === virtualSharedDesktopModuleId) {
        return resolvedVirtualSharedDesktopModuleId
      }

      if (id === virtualSharedMobileModuleId) {
        return resolvedVirtualSharedMobileModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualSharedDesktopModuleId) {
        return genSharedDesktop()
      }

      if (id === resolvedVirtualSharedMobileModuleId) {
        return genSharedMobile()
      }
    },

    configureServer(server) {
      // 监听包源码目录，让开发环境能感知新增的组件文件。
      const watchDirs = [
        path.join(ROOT, 'src/docs'),
        ...PACKAGE_NAMES.map((packageName) => path.join(PACKAGES_DIR, packageName, 'src')),
      ]

      server.watcher.add(watchDirs)

      const reload = (filepath: string) => {
        if (!isSharedFile(filepath)) {
          return
        }

        reloadSharedModules(
          server,
          [resolvedVirtualSharedDesktopModuleId, resolvedVirtualSharedMobileModuleId],
          Date.now(),
        )
      }

      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
  }
}
