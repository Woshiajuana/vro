import { type AddActionConfig } from 'plop'

import { getTemplateFile, resolvePackagePath } from './paths.ts'

export const getComponentDirPattern = (packageName: string) =>
  packageName === 'use' ? '{{ camelCase name }}' : '{{ dashCase name }}'

export const createAddAction = (
  packageName: string,
  pathSuffix: string,
  templateFileSuffix: string,
): AddActionConfig => {
  return {
    type: 'add',
    path: resolvePackagePath(
      `${packageName}/src/${getComponentDirPattern(packageName)}`,
      pathSuffix,
    ),
    templateFile: getTemplateFile('component', packageName, templateFileSuffix),
  }
}
