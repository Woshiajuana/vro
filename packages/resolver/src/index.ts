type ImportStyle = boolean | 'css' | 'deps'
type Module = 'dist' | 'src'

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
  importStyle?: ImportStyle

  /**
   * 自动导入样式的模块路径。
   *
   * @default 'dist'
   */
  module?: Module
}

function getSideEffects(options: {
  packageName: string
  componentName: string
  importStyle?: ImportStyle
  module?: Module
}) {
  const { importStyle = true, module = 'dist', packageName, componentName } = options
  if (!importStyle) {
    return
  }

  if (packageName === '@vrojs/base' && importStyle === 'deps') {
    return
  }

  const styleEntry = importStyle === true ? 'index' : importStyle
  const componentDir = kebabCase(componentName)

  return `${packageName}/${module}/${componentDir}/style/${styleEntry}`
}

function getAPIMap() {
  const apiMap = new Map<
    string,
    {
      packageName: string
      componentName: string
    }
  >()

  const configs = {
    '@vrojs/element-plus': {
      VroElSchemaFormDialog: ['showVroElSchemaFormDialog', 'useVroElSchemaFormDialog'],
      VroElSchemaDesc: ['createVroElSchemaDescDialog'],
    },
  }

  Object.entries(configs).forEach(([packageName, api]) => {
    Object.entries(api).forEach(([componentName, apiList]) => {
      apiList.forEach((api) => {
        apiMap.set(api, { packageName, componentName })
      })
    })
  })

  return apiMap
}

export function VroResolver(options: VroResolverOptions = {}) {
  const { importStyle, module } = options
  const apiMap = getAPIMap()

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.startsWith('VroEl')) {
        const packageName = '@vrojs/element-plus'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({
            importStyle,
            module,
            packageName,
            componentName: name,
          }),
        }
      } else if (name.startsWith('VroVan')) {
        const packageName = '@vrojs/vant'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({
            importStyle,
            module,
            packageName,
            componentName: name,
          }),
        }
      } else if (name.startsWith('Vro')) {
        const packageName = '@vrojs/base'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({ importStyle, module, packageName, componentName: name }),
        }
      } else if (apiMap.has(name)) {
        const { packageName, componentName } = apiMap.get(name)!
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({
            importStyle,
            module,
            packageName,
            componentName,
          }),
        }
      }
    },
  }
}
