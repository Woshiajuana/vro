import { type NodePlopAPI } from 'plop'
import { rimraf } from 'rimraf'

import { getComponentDirPattern } from '../utils/actions.ts'
import { resolvePackagePath } from '../utils/paths.ts'
import { createComponentNamePrompt, createPackageNamePrompt } from '../utils/prompts.ts'

export const registerDelete = (plop: NodePlopAPI) => {
  plop.setGenerator(`delete`, {
    description: `删除一个组件`,
    prompts: [createPackageNamePrompt(), createComponentNamePrompt()],
    actions: [
      (answers) => {
        const { packageName, name } = answers ?? {}
        const dirname = plop.renderString(getComponentDirPattern(packageName), { name })
        const pathname = resolvePackagePath(`${packageName}/src/${dirname}`)
        rimraf.sync(pathname)
        return `delete ${pathname}`
      },
      {
        type: 'OK',
      },
    ],
  })
}
