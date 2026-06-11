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

  /**
   * 是否自动导入依赖组件的相应样式
   *
   * @default true
   */
  importDepsStyle?: boolean
}

function getSideEffects(options: {
  packageName: string
  componentName: string
  importStyle?: boolean
  importDepsStyle?: boolean
}) {
  const { importStyle = true, importDepsStyle = importStyle, packageName, componentName } = options
  if (!importStyle && !importDepsStyle) {
    return
  }

  const styleEntry = importStyle ? (importDepsStyle ? 'index' : 'css') : 'deps'
  return `${packageName}/src/${kebabCase(componentName)}/style/${styleEntry}`
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
  const { importStyle, importDepsStyle } = options
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
            importDepsStyle,
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
            importDepsStyle,
            packageName,
            componentName: name,
          }),
        }
      } else if (name.startsWith('Vro')) {
        const packageName = '@vrojs/base'
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({ importStyle, packageName, componentName: name }),
        }
      } else if (apiMap.has(name)) {
        const { packageName, componentName } = apiMap.get(name)!
        return {
          name,
          from: packageName,
          sideEffects: getSideEffects({
            importStyle,
            importDepsStyle,
            packageName,
            componentName,
          }),
        }
      }
    },
  }
}
