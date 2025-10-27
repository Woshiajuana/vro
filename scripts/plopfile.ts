import { exec as rawExec } from 'child_process'
import path from 'path'
import { type NodePlopAPI } from 'plop'
import { rimraf } from 'rimraf'

const exec = (cmd: string) =>
  new Promise((resolve, reject) => {
    rawExec(cmd, (err, stdout, stderr) => {
      if (err || stderr) reject(err || stderr)
      else resolve(stdout)
    })
  })

const r = (...args: string[]) => path.resolve(import.meta.dirname, '..', ...args)
const rt = (...args: string[]) => r('scripts/plop-templates', ...args)
const rc = (...args: string[]) => r('packages', ...args)

export default function (plop: NodePlopAPI) {
  // 生成入库文件
  plop.setGenerator('entry', {
    description: `生成入口文件`,
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
      { type: 'confirm', name: 'ok', message: '确认删除？' },
    ],
    actions: (res) => {
      const { name, ok } = res ?? {}
      if (ok) {
        const dirname = plop.getHelper('dashCase')(name)
        rimraf.sync(rc(dirname))
        console.log('✔ 删除成功')
      }
      return []
    },
  })
}
