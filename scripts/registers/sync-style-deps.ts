import fg from 'fast-glob'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { type ActionType, type NodePlopAPI } from 'plop'

import { resolvePackagePath } from '../utils/paths.ts'
import { createPackageNamePrompt } from '../utils/prompts.ts'

const packageNames = ['core', 'element-plus', 'vant'] as const
type PackageName = (typeof packageNames)[number]

const packageImportMap: Record<string, PackageName> = {
  '@vrojs/core': 'core',
  '@vrojs/element-plus': 'element-plus',
  '@vrojs/vant': 'vant',
}

const importRE = /import\s+(?:type\s+)?(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g
const namedImportRE = /\{([^}]+)\}/

const kebabCase = (key: string) => {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

const getComponentDirs = (packageName: PackageName) => {
  const srcDir = resolvePackagePath(packageName, 'src')
  return fg
    .sync('*/index.ts', {
      cwd: srcDir,
      onlyFiles: true,
    })
    .map((item) => item.split('/')[0])
    .filter((item) => item.startsWith('vro'))
}

const getNamedImports = (statement: string) => {
  const matched = statement.match(namedImportRE)
  if (!matched) {
    return []
  }

  return matched[1]
    .split(',')
    .map((item) =>
      item
        .trim()
        .split(/\s+as\s+/i)[0]
        .trim(),
    )
    .filter(Boolean)
}

const isComponentImport = (name: string) => /^[A-Z]/.test(name)

const getElementPlusStyle = (name: string) => {
  if (!name.startsWith('El')) {
    return
  }

  return `element-plus/es/components/${kebabCase(name.slice(2))}/style/css`
}

const getVantStyle = (name: string) => {
  if (!isComponentImport(name)) {
    return
  }

  return `vant/es/${kebabCase(name.replace(/^Van/, ''))}/style`
}

const getPackageComponentStyle = (packageName: PackageName, componentDir: string) => {
  return `@vrojs/${packageName}/src/${componentDir}/style/index`
}

const resolveRelativeComponent = (options: {
  packageName: PackageName
  componentDir: string
  importerFile: string
  source: string
}) => {
  const { packageName, componentDir, importerFile, source } = options
  const absoluteImportPath = path.resolve(path.dirname(importerFile), source)
  const srcDir = resolvePackagePath(packageName, 'src')
  const relativeImportPath = path.relative(srcDir, absoluteImportPath).replace(/\\/g, '/')
  const [maybeComponent] = relativeImportPath.split('/')

  if (!maybeComponent || maybeComponent === componentDir || !maybeComponent.startsWith('vro')) {
    return
  }

  if (existsSync(resolvePackagePath(packageName, 'src', maybeComponent, 'index.ts'))) {
    return maybeComponent
  }
}

const toRelativeStyleImport = (
  packageName: PackageName,
  componentDir: string,
  styleImport: string,
) => {
  const currentStyleDir = resolvePackagePath(packageName, 'src', componentDir, 'style')

  if (styleImport.startsWith(`@vrojs/${packageName}/src/`)) {
    const target = resolvePackagePath(
      packageName,
      styleImport.replace(`@vrojs/${packageName}/`, ''),
    )
    let relative = path.relative(currentStyleDir, target).replace(/\\/g, '/')
    if (!relative.startsWith('.')) {
      relative = `./${relative}`
    }
    return relative
  }

  return styleImport
}

const toImportCode = (packageName: PackageName, componentDir: string, deps: string[]) => {
  return deps
    .sort()
    .map((item) => `import '${toRelativeStyleImport(packageName, componentDir, item)}'`)
}

const collectStyleDeps = (packageName: PackageName, componentDir: string) => {
  const componentRoot = resolvePackagePath(packageName, 'src', componentDir)
  const files = fg.sync(['**/*.{ts,vue}', '!style/**', '!demo/**', '!README.md'], {
    cwd: componentRoot,
    absolute: true,
    onlyFiles: true,
  })
  const internalDeps = new Set<string>()
  const externalDeps = new Set<string>()

  files.forEach((file) => {
    const code = readFileSync(file, 'utf8')
    Array.from(code.matchAll(importRE)).forEach((matched) => {
      const statement = matched[0]
      const source = matched[1]
      const namedImports = getNamedImports(statement).filter(isComponentImport)

      if (source === 'element-plus') {
        namedImports.forEach((name) => {
          const styleImport = getElementPlusStyle(name)
          if (styleImport) {
            externalDeps.add(styleImport)
          }
        })
        return
      }

      if (source === 'vant') {
        namedImports.forEach((name) => {
          const styleImport = getVantStyle(name)
          if (styleImport) {
            externalDeps.add(styleImport)
          }
        })
        return
      }

      if (source.startsWith('.')) {
        const depComponent = resolveRelativeComponent({
          packageName,
          componentDir,
          importerFile: file,
          source,
        })

        if (depComponent) {
          internalDeps.add(getPackageComponentStyle(packageName, depComponent))
        }
        return
      }

      const depPackageName = packageImportMap[source]
      if (depPackageName) {
        namedImports.forEach((name) => {
          const componentName = kebabCase(name)
          if (existsSync(resolvePackagePath(depPackageName, 'src', componentName, 'index.ts'))) {
            internalDeps.add(getPackageComponentStyle(depPackageName, componentName))
          }
        })
      }
    })
  })

  return {
    internalDeps: Array.from(internalDeps),
    externalDeps: Array.from(externalDeps),
  }
}

const writeCssStyle = (packageName: PackageName, componentDir: string, internalDeps: string[]) => {
  const cssPath = resolvePackagePath(packageName, 'src', componentDir, 'style/css.ts')
  if (!existsSync(cssPath)) {
    return
  }

  const imports = toImportCode(packageName, componentDir, internalDeps).concat([
    "import '../../styles/base.scss'",
    "import './index.scss'",
  ])

  writeFileSync(cssPath, `${imports.join('\n')}\n`)
}

const writeDepsStyle = (packageName: PackageName, componentDir: string, externalDeps: string[]) => {
  const depsPath = resolvePackagePath(packageName, 'src', componentDir, 'style/deps.ts')
  if (!existsSync(depsPath)) {
    return
  }

  const imports = toImportCode(packageName, componentDir, externalDeps).join('\n')
  writeFileSync(depsPath, imports ? `${imports}\n` : '')
}

const writeIndexStyle = (
  packageName: PackageName,
  componentDir: string,
  internalDeps: string[],
  externalDeps: string[],
) => {
  const indexPath = resolvePackagePath(packageName, 'src', componentDir, 'style/index.ts')
  const cssPath = resolvePackagePath(packageName, 'src', componentDir, 'style/css.ts')
  const depsPath = resolvePackagePath(packageName, 'src', componentDir, 'style/deps.ts')

  if (existsSync(cssPath) && existsSync(depsPath)) {
    writeFileSync(indexPath, "import './deps'\nimport './css'\n")
    return
  }

  const imports = toImportCode(packageName, componentDir, internalDeps.concat(externalDeps)).concat([
    "import '../../styles'",
    "import './index.scss'",
  ])

  writeFileSync(indexPath, `${imports.join('\n')}\n`)
}

export const syncStyleDeps = (packageName: string) => {
  if (!packageNames.includes(packageName as PackageName)) {
    return
  }

  const currentPackageName = packageName as PackageName
  getComponentDirs(currentPackageName).forEach((componentDir) => {
    const { internalDeps, externalDeps } = collectStyleDeps(currentPackageName, componentDir)

    writeCssStyle(currentPackageName, componentDir, internalDeps)
    writeDepsStyle(currentPackageName, componentDir, externalDeps)
    writeIndexStyle(currentPackageName, componentDir, internalDeps, externalDeps)
  })
}

export const registerSyncStyleDeps = (plop: NodePlopAPI) => {
  plop.setGenerator('sync-style-deps', {
    description: `同步组件样式依赖`,
    prompts: [createPackageNamePrompt({ type: 'checkbox' })],
    actions: (answers) => {
      const packageName: string[] = answers?.packageName ?? []
      return packageName.map((name) => {
        return (() => {
          syncStyleDeps(name)
          return `sync ${name} style deps`
        }) as ActionType
      })
    },
  })
}
