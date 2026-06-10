import { getComponentRecords, hasFile, toImportPath } from './shared'

export function genSharedMobile() {
  const demos = getComponentRecords().filter((item) => hasFile(item.demoPath))

  return `export const demos = [
${demos
  .map(
    (item) => `  {
    path: '/${item.packageName}/${item.componentDir}',
    name: 'demo-${item.packageName}-${item.componentDir}',
    component: () => import('${toImportPath(item.demoPath)}'),
    meta: {
      type: 'demo',
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
