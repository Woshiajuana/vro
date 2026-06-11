import { existsSync } from 'node:fs'
import path from 'node:path'

import { pascalCase } from '@daysnap/utils'
import fg from 'fast-glob'

import { PACKAGE_NAMES, type PackageName, PACKAGES_DIR, toFsImportPath } from '../../utils'

export interface ComponentRecord {
  packageName: PackageName
  componentDir: string
  title: string
  readmePath: string
  demoPath: string
}

export const getComponentRecords = () => {
  return PACKAGE_NAMES.flatMap((packageName) => {
    const srcDir = path.join(PACKAGES_DIR, packageName, 'src')
    return fg
      .sync(['vro*/index.ts', 'use*/index.ts'], {
        cwd: srcDir,
        onlyFiles: true,
      })
      .map((item) => item.split('/')[0])
      .sort()
      .map<ComponentRecord>((componentDir) => ({
        packageName,
        componentDir,
        title: pascalCase(componentDir),
        readmePath: path.join(srcDir, componentDir, 'README.md'),
        demoPath: path.join(srcDir, componentDir, 'demo/index.vue'),
      }))
  })
}

export const toImportPath = (value: string) => toFsImportPath(value)

export const hasFile = (value: string) => existsSync(value)
