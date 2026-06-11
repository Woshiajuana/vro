import { type NodePlopAPI } from 'plop'

export const registerHelpers = (plop: NodePlopAPI) => {
  plop.setHelper('withInstallPath', (packageName: string) =>
    packageName === 'base' ? '../utils' : '@vrojs/base',
  )

  plop.setHelper('withInstallImportBreak', (packageName: string) =>
    packageName === 'base' ? '' : '\n',
  )
}
