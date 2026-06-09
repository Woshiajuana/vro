import { exec as rawExec } from 'child_process'
import { type NodePlopAPI } from 'plop'

const exec = (cmd: string) =>
  new Promise((resolve, reject) => {
    rawExec(cmd, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout)
    })
  })

export const registerActions = (plop: NodePlopAPI) => {
  plop.setActionType('OK', async (answers) => {
    const { packageName } = answers
    await exec(`npm run plop entry ${packageName}`)
    return `SUCCESS`
  })
}
