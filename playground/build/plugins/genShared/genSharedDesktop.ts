import { getComponentRecords, hasFile, toImportPath } from './shared'

export function genSharedDesktop() {
  const documents = getComponentRecords().filter((item) => hasFile(item.readmePath))

  return `export const documents = [
${documents
  .map(
    (item) => `  {
    path: '/docs/${item.packageName}/${item.componentDir}',
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
