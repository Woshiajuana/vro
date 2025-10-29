import path from 'node:path'
import fs from 'node:fs'
import humps from 'humps'
import glob from 'fast-glob'
import { readdirSync } from 'node:fs'
import { UI_SRC_DIR, normalizePath, UI_DOCS_DIR, USE_SRC_DIR, JSSDK_SRC_DIR } from '../../utils'

interface DocumentItem {
  name: string
  path: string
}

function genExportDocuments(items: DocumentItem[]) {
  return `export const documents = {
    ${items.map((item) => item.name).join(',\n  ')}
  };`
}

function genImportDocuments(items: DocumentItem[]) {
  return items
    .map((item) => {
      const path = normalizePath(item.path)
      return `const ${item.name} = () => import('${path}');`
    })
    .join('\n')
}

function getUIDocuments() {
  const dirs = readdirSync(UI_SRC_DIR)
  const readmeDocs = dirs.map((dir) => {
    return { name: humps.pascalize(dir) + '_ui_2', path: path.join(UI_SRC_DIR, dir, 'README.md') }
  })
  const staticDocs = glob.sync(normalizePath(path.join(UI_DOCS_DIR, '**/*.md'))).map((filepath) => {
    const pairs = path.parse(filepath).name.split('.')
    return {
      name: humps.pascalize(pairs[0]) + '_docs_1',
      path: filepath,
    }
  })
  return [...staticDocs, ...readmeDocs]
}

function getUSEDocuments() {
  return readdirSync(USE_SRC_DIR).map((dir) => {
    return { name: humps.pascalize(dir) + '_use_3', path: path.join(USE_SRC_DIR, dir, 'README.md') }
  })
}

function getJSSDKDocuments() {
  return glob.sync(normalizePath(path.join(JSSDK_SRC_DIR, '**/README.md'))).map((filepath) => {
    return {
      name: humps.pascalize(path.basename(path.dirname(filepath))) + '_jssdk_4',
      path: filepath,
    }
  })
}

export function genSharedDesktop() {
  const uiDocuments = getUIDocuments()
  const useDocuments = getUSEDocuments()
  const jssdkDocuments = getJSSDKDocuments()
  const documents = [...uiDocuments, ...useDocuments, ...jssdkDocuments].filter((item) =>
    fs.existsSync(item.path),
  )

  return `
    ${genImportDocuments(documents)}
    ${genExportDocuments(documents)}
  `
}
