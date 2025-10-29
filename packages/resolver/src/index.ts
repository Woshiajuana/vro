function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export interface VroResolverOptions {
  /**
   * 是否自动导入组件的相应样式
   *
   * @default true
   */
  importStyle?: boolean
}

function getSideEffects(options: {
  packageName: string
  componentName: string
  importStyle?: boolean
}) {
  const { importStyle = true, packageName, componentName } = options
  if (!importStyle) {
    return
  }
  return `${packageName}/src/${kebabCase(componentName)}/style/index`
}

export function VroResolver(options: VroResolverOptions = {}) {
  const { importStyle } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('VroEl')) {
        const packageName = '@vrojs/element-plus'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({ importStyle, packageName, componentName: name }),
        }
      } else if (name.startsWith('VroVan')) {
        const packageName = '@vrojs/vant'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({ importStyle, packageName, componentName: name }),
        }
      } else if (name.startsWith('Vro')) {
        const packageName = '@vrojs/core'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({ importStyle, packageName, componentName: name }),
        }
      }
    },
  }
}
