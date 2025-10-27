import { exec as rawExec } from 'child_process'
import fg from 'fast-glob'
import path from 'path'
import { type AddActionConfig, type NodePlopAPI } from 'plop'
import { rimraf } from 'rimraf'

const exec = (cmd: string) =>
  new Promise((resolve, reject) => {
    rawExec(cmd, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout)
    })
  })

const r = (...args: string[]) => path.resolve(import.meta.dirname, '..', ...args)
const rt = (...args: string[]) => r('scripts/plop-templates', ...args)
const rc = (...args: string[]) => r('packages', ...args)

export default function (plop: NodePlopAPI) {
  plop.setActionType('OK', async (answers) => {
    const { packageName } = answers
    await exec(`npm run plop entry ${packageName}`)
    return `SUCCESS`
  })

  // 生成入库文件
  plop.setGenerator('entry', {
    description: `生成入口文件`,
    prompts: [
      {
        type: 'checkbox',
        name: 'packageNames',
        message: '请选择包名？',
        choices: ['core', 'element-plus', 'vant'],
      },
    ],
    actions: (answers) => {
      const packageNames: string[] = answers?.packageNames ?? []
      const actions = packageNames
        .map((name) => {
          const entries = fg.sync([
            `packages/${name}/src/**/index.ts`,
            `!packages/${name}/src/index.ts`,
            `!packages/${name}/src/**/style/index.ts`,
          ])

          const components = entries
            .map((item) => {
              const res = item.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)
              return res?.[1]
            })
            .filter(Boolean)

          return {
            type: 'add',
            path: rc(`${name}/src/index.ts`),
            templateFile: rt('entry.hbs'),
            force: true,
            data: { components },
          } as AddActionConfig
        })
        .flat()
      return actions
    },
  })

  // 新增一个组件
  plop.setGenerator(`create`, {
    description: `创建一个新组件`,
    prompts: [
      {
        type: 'list',
        name: 'packageName',
        message: '请选择包名？',
        choices: ['core', 'element-plus', 'vant'],
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入名称？',
        filter: (v) => (v.toLocaleLowerCase().startsWith('vro') ? v : `vro-${v}`),
      },
    ],
    actions: [
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/index.ts'),
        templateFile: rt('component/index.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/{{ dashCase name }}.vue'),
        templateFile: rt('component/vue.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/types.ts'),
        templateFile: rt('component/types.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/README.md'),
        templateFile: rt('component/md.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/demo/index.vue'),
        templateFile: rt('component/demo/vue.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/style/index.ts'),
        templateFile: rt('component/style/index.hbs'),
      },
      {
        type: 'add',
        path: rc('{{packageName}}/src/{{ dashCase name }}/style/index.scss'),
        templateFile: rt('component/style/scss.hbs'),
      },
      {
        type: 'OK',
      },
    ],
  })

  // 删除一个组件
  plop.setGenerator(`delete`, {
    description: `删除一个组件`,
    prompts: [
      {
        type: 'list',
        name: 'packageName',
        message: '请选择包名？',
        choices: ['core', 'element-plus', 'vant'],
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入名称？',
        filter: (v) => (v.toLocaleLowerCase().startsWith('vro') ? v : `vro-${v}`),
      },
    ],
    actions: [
      (answers) => {
        const { packageName, name } = answers ?? {}
        const dirname = plop.getHelper('dashCase')(name)
        const pathname = rc(`${packageName}/src/${dirname}`)
        rimraf.sync(pathname)
        return `delete ${pathname}`
      },
      {
        type: 'OK',
      },
    ],
  })
}
