import { type NodePlopAPI } from 'plop'

import { registerActions } from './registers/actions.ts'
import { registerCreate } from './registers/create.ts'
import { registerDelete } from './registers/delete.ts'
import { registerEntry } from './registers/entry.ts'
import { registerHelpers } from './registers/helpers.ts'

export default function (plop: NodePlopAPI) {
  registerHelpers(plop)

  registerActions(plop)

  registerEntry(plop)

  registerCreate(plop)

  registerDelete(plop)
}
