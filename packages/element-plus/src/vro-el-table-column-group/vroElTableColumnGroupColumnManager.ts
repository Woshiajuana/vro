import { ComponentManager } from '@vrojs/base'
import { ElTableColumn } from 'element-plus'

import VroElTableActionsColumn from '../vro-el-table-actions-column'
import VroElTableColumn from '../vro-el-table-column'

export const vroElTableColumnGroupColumnManager = new ComponentManager()

vroElTableColumnGroupColumnManager
  .add('ElTableColumn', ElTableColumn)
  .add('VroElTableColumn', VroElTableColumn)
  .add('VroElTableActionsColumn', VroElTableActionsColumn)
