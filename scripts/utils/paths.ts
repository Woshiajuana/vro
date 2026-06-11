import { existsSync } from 'fs'
import path from 'path'

const root = (...args: string[]) => path.resolve(import.meta.dirname, '../..', ...args)

export const resolvePackagePath = (...args: string[]) => root('packages', ...args)
export const resolveTemplatePath = (...args: string[]) => root('scripts/plop-templates', ...args)

export type TemplateScope = 'component' | 'entry'

export const getTemplateFile = (
  scope: TemplateScope,
  packageName: string,
  templateFileSuffix: string,
) => {
  return resolveTemplatePath(scope, packageName, templateFileSuffix)
}

export const hasPackageTemplate = (
  scope: TemplateScope,
  packageName: string,
  templateFileSuffix: string,
) => {
  return existsSync(resolveTemplatePath(scope, packageName, templateFileSuffix))
}
