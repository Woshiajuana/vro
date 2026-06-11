import path from 'node:path'

import fg from 'fast-glob'

import { normalizePath, ROOT } from '../../utils'
import { getComponentRecords, hasFile, toImportPath } from './shared'

const getGuideDocuments = () => {
  const docsDir = path.join(ROOT, 'src/docs')
  return fg
    .sync('**/*.md', {
      cwd: docsDir,
      onlyFiles: true,
    })
    .sort()
    .map((filename) => {
      const name = normalizePath(filename).replace(/\.md$/, '')
      const routePath = name === 'index' ? '/' : `/${name}`
      const maps: Record<string, string> = {
        index: '介绍',
        quickstart: '快速上手',
      }

      return {
        name,
        path: routePath,
        title: maps[name] ?? name,
        filepath: path.join(docsDir, filename),
      }
    })
}

export function genSharedDesktop() {
  const documents = getComponentRecords().filter((item) => hasFile(item.readmePath))
  const guideDocuments = getGuideDocuments().filter((item) => hasFile(item.filepath))
  const guideRoutes = guideDocuments.map(
    (item) => `  {
    path: '${item.path}',
    name: 'docs-guide-${item.name.replace(/\//g, '-')}',
    component: () => import('${toImportPath(item.filepath)}'),
    meta: {
      type: 'docs',
      group: 'guide',
      title: '${item.title}',
    },
  }`,
  )

  return `export const documents = [
${guideRoutes.join(',\n')}${guideRoutes.length && documents.length ? ',\n' : ''}
${documents
  .map(
    (item) => `  {
    path: '/${item.packageName}/${item.componentDir}',
    name: 'docs-${item.packageName}-${item.componentDir}',
    component: () => import('${toImportPath(item.readmePath)}'),
    meta: {
      type: 'docs',
      packageName: '${item.packageName}',
      componentDir: '${item.componentDir}',
      title: '${item.title}',
    },
  }`,
  )
  .join(',\n')}
]
`
}
