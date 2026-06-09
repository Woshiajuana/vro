import { type AddActionConfig } from 'plop'

import { getTemplateFile, resolvePackagePath } from './paths.ts'

export const createAddAction = (
  packageName: string,
  pathSuffix: string,
  templateFileSuffix: string,
): AddActionConfig => {
  return {
    type: 'add',
    path: resolvePackagePath(`${packageName}/src/{{ dashCase name }}`, pathSuffix),
    templateFile: getTemplateFile('component', packageName, templateFileSuffix),
  }
}
