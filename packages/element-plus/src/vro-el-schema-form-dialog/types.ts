import type { ExtractPropTypes, PropType } from 'vue'

import { vroElSchemaFormProps, type VroElSchemaFormSchema } from '../vro-el-schema-form'

export interface VroElSchemaFormDialogRequest {
  (data: any, schema: VroElSchemaFormSchema): Promise<any>
}

export const vroElSchemaFormDialogProps = {
  ...vroElSchemaFormProps,
  title: String,
  style: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: () => ({}),
  },
  request: Function as PropType<VroElSchemaFormDialogRequest>,
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'top',
  },
  labelWidth: {
    type: String,
    default: '120px',
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  cancelButtonText: String,
  confirmButtonText: String,
}

export type VroElSchemaFormDialogProps = ExtractPropTypes<typeof vroElSchemaFormDialogProps>
