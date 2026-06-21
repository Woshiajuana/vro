import type { ColProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroElSchemaFormProps } from '../vro-el-schema-form'

export const vroElSchemaFilterProps = {
  ...vroElSchemaFormProps,

  /**
   * 筛选项默认栅格配置。
   */
  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({ span: 8 }),
  },

  /**
   * 表单标签宽度，透传给内部 VroElSchemaForm。
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '120px',
  },

  /**
   * 查询和重置按钮 loading 状态。
   */
  loading: Boolean,
}

export type VroElSchemaFilterProps = ExtractPropTypes<typeof vroElSchemaFilterProps>
