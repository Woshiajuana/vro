import fg from 'fast-glob'
import { type ActionType, type NodePlopAPI } from 'plop'

import { getTemplateFile, hasPackageTemplate, resolvePackagePath } from '../utils/paths.ts'
import { createPackageNamePrompt } from '../utils/prompts.ts'

const getComponents = (packageName: string) => {
  const entries = fg.sync([
    `packages/${packageName}/src/**/index.ts`,
    `!packages/${packageName}/src/styles/index.ts`,
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
      template: 'styles/index.hbs',
    },
    {
      path: 'css.ts',
      template: 'styles/css.hbs',
    },
    {
      path: 'deps.ts',
      template: 'styles/deps.hbs',
      data: { components: components.filter((item) => item?.startsWith('vro')) },
    },
  ]

  return configs
    .filter(({ template }) => hasPackageTemplate('entry', packageName, template))
    .map(({ path: pathSuffix, template, data }) => ({
      type: 'add',
      path: resolvePackagePath(`${packageName}/src/styles/${pathSuffix}`),
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
          const actions = [
            {
              type: 'add',
              path: resolvePackagePath(`${name}/src/index.ts`),
              templateFile: getTemplateFile('entry', name, 'index.hbs'),
              force: true,
              data: { components },
            },
            {
              type: 'add',
              path: resolvePackagePath(`${name}/src/styles/index.scss`),
              templateFile: getTemplateFile('entry', name, 'style.hbs'),
              force: true,
              data: { components: components.filter((item) => item?.startsWith('vro')) },
            },
          ] as ActionType[]

          actions.push(...createPackageStyleEntryActions(name, components))
          return actions
        })
        .flat()
    },
  })
}
