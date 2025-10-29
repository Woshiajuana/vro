import { readdirSync, existsSync } from 'node:fs'
import humps from 'humps'
import glob from 'fast-glob'
import { UI_SRC_DIR, removeExt, normalizePath, USE_SRC_DIR, JSSDK_SRC_DIR } from '../../utils'
import path from 'node:path'

interface DemoItem {
  name: string
  path: string
  component: string
}

function genImports(demos: DemoItem[]) {
  return demos
    .map((item) => {
      const path = removeExt(normalizePath(item.path))
      return `const ${item.name} = () => import('${path}')`
    })
    .join('\n')
}

function genExports(demos: DemoItem[]) {
  return `export const demos = {\n  ${demos.map((item) => item.name).join(',\n  ')}\n};`
}

function getUIDemos() {
  return readdirSync(UI_SRC_DIR).map((component) => ({
    component,
    name: humps.pascalize(component) + '_ui_2',
    path: path.join(UI_SRC_DIR, component, 'demo/index.vue'),
  }))
}

function getUSEDemos() {
  return readdirSync(USE_SRC_DIR).map((component) => ({
    component,
    name: humps.pascalize(component) + '_use_3',
    path: path.join(USE_SRC_DIR, component, 'demo.vue'),
  }))
}

function getJSSDKDemos() {
  return glob.sync(normalizePath(path.join(JSSDK_SRC_DIR, '**/demo.vue'))).map((filepath) => {
    const component = path.basename(path.dirname(filepath))
    return {
      component,
      name: humps.pascalize(component) + '_jssdk_3',
      path: filepath,
    }
  })
}

function genUIStylesImport() {
  return readdirSync(UI_SRC_DIR)
    .map((component) => normalizePath(path.join(UI_SRC_DIR, component, 'style/index.ts')))
    .filter((item) => existsSync(item))
    .map((item) => `import '${item}'`)
    .join('\n')
}

export function genShareMobile() {
  const uiDemos = getUIDemos()
  const useDemos = getUSEDemos()
  const jssdkDemos = [] || getJSSDKDemos()

  const demos = [...uiDemos, ...useDemos, ...jssdkDemos].filter((item) => existsSync(item.path))

  return `
  ${genUIStylesImport()}

  ${genImports(demos)}

  ${genExports(demos)}
  `
}
