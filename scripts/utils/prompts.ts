export const createPackageNamePrompt = (
  options: { type?: 'list' | 'checkbox'; choices?: string[] } = {},
) => {
  return {
    type: 'list',
    name: 'packageName',
    message: '请选择包名？',
    choices: ['base', 'element-plus', 'vant', 'use'],
    ...options,
  }
}

export const createComponentNamePrompt = () => {
  return {
    type: 'input',
    name: 'name',
    message: '请输入名称？',
    filter: (v: string, answers: any) => {
      const { packageName } = answers || {}
      if (packageName === 'use') {
        return v.toLocaleLowerCase().startsWith('use') ? v : ['use', v].filter(Boolean).join('-')
      }

      const maps: Record<string, string> = { base: '', 'element-plus': 'el', vant: 'van' }
      return v.toLocaleLowerCase().startsWith('vro')
        ? v
        : ['vro', maps[packageName]].concat(v).filter(Boolean).join('-')
    },
  }
}
