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
      const actions = [
        createAddAction(packageName, `index.ts`, `index.ts.hbs`),
        createAddAction(packageName, `{{ dashCase name }}.vue`, `component.vue.hbs`),
        createAddAction(packageName, `types.ts`, `types.ts.hbs`),
        createAddAction(packageName, `README.md`, `README.md.hbs`),
        createAddAction(packageName, `demo/index.vue`, `demo/index.vue.hbs`),
        createAddAction(packageName, `style/index.ts`, `style/index.ts.hbs`),
        createAddAction(packageName, `style/index.scss`, `style/index.scss.hbs`),
      ] as ActionType[]

      const packageStyleActions = [
        ['style/css.ts', 'style/css.ts.hbs'],
        ['style/deps.ts', 'style/deps.ts.hbs'],
      ]

      packageStyleActions.forEach(([pathSuffix, templateFileSuffix]) => {
        if (hasPackageTemplate('component', packageName, templateFileSuffix)) {
          actions.push(createAddAction(packageName, pathSuffix, templateFileSuffix))
        }
      })

      actions.push({ type: 'OK' })
      return actions
    },
  })
}
