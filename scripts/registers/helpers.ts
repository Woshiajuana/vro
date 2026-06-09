import { type NodePlopAPI } from 'plop'

export const registerHelpers = (plop: NodePlopAPI) => {
  plop.setHelper('withInstallPath', (packageName: string) =>
    packageName === 'core' ? '../utils' : '@vrojs/core',
  )
}
