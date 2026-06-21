import type { ColProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroElSchemaFormProps } from '../vro-el-schema-form'

export const vroElSchemaFilterProps = {
  ...vroElSchemaFormProps,

  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({ span: 8 }),
  },

  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '120px',
  },

  loading: Boolean,
}

export type VroElSchemaFilterProps = ExtractPropTypes<typeof vroElSchemaFilterProps>
