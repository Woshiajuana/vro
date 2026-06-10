import fg from 'fast-glob'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const packageNames = ['core', 'element-plus', 'vant'] as const
type PackageName = (typeof packageNames)[number]

const packagesRoot = fileURLToPath(new URL('../../../../packages', import.meta.url))

const titleCase = (value: string) => {
  return value
    .split('-')
    .filter(Boolean)
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ')
}

const toFsImportPath = (path: string) => {
  return `/@fs/${path.replace(/\\/g, '/')}`
}

const toRouteName = (type: 'docs' | 'demo', packageName: PackageName, componentDir: string) => {
  return `${type}-${packageName}-${componentDir}`
}

const getPackageComponents = (packageName: PackageName) => {
  const srcRoot = `${packagesRoot}/${packageName}/src`
  return fg
    .sync('vro*/index.ts', {
      cwd: srcRoot,
      onlyFiles: true,
    })
    .map((item) => item.split('/')[0])
    .sort()
}

const getRoutesCode = (type: 'docs' | 'demo') => {
  return packageNames
    .flatMap((packageName) => {
      return getPackageComponents(packageName).flatMap((componentDir) => {
        const filename = type === 'docs' ? 'README.md' : 'demo/index.vue'
        const filepath = `${packagesRoot}/${packageName}/src/${componentDir}/${filename}`
        if (!existsSync(filepath)) {
          return []
        }

        return [
          `{
    path: '/${type}/${packageName}/${componentDir}',
    name: '${toRouteName(type, packageName, componentDir)}',
    component: () => import('${toFsImportPath(filepath)}'),
    meta: {
      type: '${type}',
      packageName: '${packageName}',
      componentDir: '${componentDir}',
      title: '${titleCase(componentDir)}',
    },
  }`,
        ]
      })
    })
    .join(',\n')
}

export function genSharedRoutes() {
  return `export const docsRoutes = [
${getRoutesCode('docs')}
]

export const demoRoutes = [
${getRoutesCode('demo')}
]
`
}
