import fg from 'fast-glob'
import { type ActionType, type NodePlopAPI } from 'plop'

import { getTemplateFile, hasPackageTemplate, resolvePackagePath } from '../utils/paths.ts'
import { createPackageNamePrompt } from '../utils/prompts.ts'

const getComponents = (packageName: string) => {
  const entries = fg.sync([
    `packages/${packageName}/src/**/index.ts`,
    `!packages/${packageName}/src/style/index.ts`,
    `!packages/${packageName}/src/index.ts`,
    `!packages/${packageName}/src/**/style/index.ts`,
  ])

  return entries
    .map((item) => {
      const res = item.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)
      return res?.[1]
    })
    .filter(Boolean) as string[]
}

const createPackageStyleEntryActions = (packageName: string, components: string[]) => {
  const configs = [
    {
      path: 'index.ts',
      template: 'style/index.ts.hbs',
    },
    {
      path: 'css.ts',
      template: 'style/css.ts.hbs',
    },
    {
      path: 'deps.ts',
      template: 'style/deps.ts.hbs',
      data: { components: components.filter((item) => item?.startsWith('vro')) },
    },
  ]

  return configs
    .filter(({ template }) => hasPackageTemplate('entry', packageName, template))
    .map(({ path: pathSuffix, template, data }) => ({
      type: 'add',
      path: resolvePackagePath(`${packageName}/src/style/${pathSuffix}`),
      templateFile: getTemplateFile('entry', packageName, template),
      force: true,
      data,
    })) as ActionType[]
}

export const registerEntry = (plop: NodePlopAPI) => {
  plop.setGenerator('entry', {
    description: `生成入口文件`,
    prompts: [createPackageNamePrompt({ type: 'checkbox' })],
    actions: (answers) => {
      const packageName: string[] = answers?.packageName ?? []
      return packageName
        .map((name) => {
          const components = getComponents(name)
          const actions = [] as ActionType[]

          if (hasPackageTemplate('entry', name, 'index.ts.hbs')) {
            actions.push({
              type: 'add',
              path: resolvePackagePath(`${name}/src/index.ts`),
              templateFile: getTemplateFile('entry', name, 'index.ts.hbs'),
              force: true,
              data: { components },
            })
          }

          if (hasPackageTemplate('entry', name, 'style/index.scss.hbs')) {
            actions.push({
              type: 'add',
              path: resolvePackagePath(`${name}/src/style/index.scss`),
              templateFile: getTemplateFile('entry', name, 'style/index.scss.hbs'),
              force: true,
              data: { components: components.filter((item) => item?.startsWith('vro')) },
            })
          }

          actions.push(...createPackageStyleEntryActions(name, components))
          return actions
        })
        .flat()
    },
  })
}
