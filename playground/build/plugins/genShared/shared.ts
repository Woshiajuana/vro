import fg from 'fast-glob'
import { existsSync } from 'node:fs'
import path from 'node:path'

import { PACKAGE_NAMES, PACKAGES_DIR, type PackageName, toFsImportPath } from '../../utils'

export interface ComponentRecord {
  packageName: PackageName
  componentDir: string
  title: string
  readmePath: string
  demoPath: string
}

export const titleCase = (value: string) => {
  return value
    .split('-')
    .filter(Boolean)
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ')
}

export const getComponentRecords = () => {
  return PACKAGE_NAMES.flatMap((packageName) => {
    const srcDir = path.join(PACKAGES_DIR, packageName, 'src')
    return fg
      .sync('vro*/index.ts', {
        cwd: srcDir,
        onlyFiles: true,
      })
      .map((item) => item.split('/')[0])
      .sort()
      .map<ComponentRecord>((componentDir) => ({
        packageName,
        componentDir,
        title: titleCase(componentDir),
        readmePath: path.join(srcDir, componentDir, 'README.md'),
        demoPath: path.join(srcDir, componentDir, 'demo/index.vue'),
      }))
  })
}

export const toImportPath = (value: string) => toFsImportPath(value)

export const hasFile = (value: string) => existsSync(value)
