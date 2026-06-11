import { type ActionType, type NodePlopAPI } from 'plop'

import { createAddAction } from '../utils/actions.ts'
import { hasPackageTemplate } from '../utils/paths.ts'
import { createComponentNamePrompt, createPackageNamePrompt } from '../utils/prompts.ts'

export const registerCreate = (plop: NodePlopAPI) => {
  plop.setGenerator(`create`, {
    description: `创建一个新组件`,
    prompts: [createPackageNamePrompt(), createComponentNamePrompt()],
    actions: (answers) => {
      const { packageName } = answers ?? {}
      const configs = [
        ['index.ts', 'index.ts.hbs'],
        ['{{ dashCase name }}.vue', 'component.vue.hbs'],
        ['types.ts', 'types.ts.hbs'],
        ['README.md', 'README.md.hbs'],
        ['demo/index.vue', 'demo/index.vue.hbs'],
        ['style/index.ts', 'style/index.ts.hbs'],
        ['style/index.scss', 'style/index.scss.hbs'],
        ['style/css.ts', 'style/css.ts.hbs'],
        ['style/deps.ts', 'style/deps.ts.hbs'],
      ]

      const actions = [] as ActionType[]

      configs.forEach(([pathSuffix, templateFileSuffix]) => {
        if (hasPackageTemplate('component', packageName, templateFileSuffix)) {
          actions.push(createAddAction(packageName, pathSuffix, templateFileSuffix))
        }
      })

      actions.push({ type: 'OK' })
      return actions
    },
  })
}
