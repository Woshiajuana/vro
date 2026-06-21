import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

import { vroElSchemaFormProps, type VroElSchemaFormSchema } from '../vro-el-schema-form'

export interface VroElSchemaFormDialogRequest {
  (data: any, schema: VroElSchemaFormSchema): Promise<any>
}

export const vroElSchemaFormDialogProps = {
  ...vroElSchemaFormProps,

  /**
   * 弹窗标题。
   */
  title: String,

  /**
   * 弹窗样式。
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  /**
   * 确认前的提交请求，返回值会作为 confirm 事件参数。
   */
  request: Function as PropType<VroElSchemaFormDialogRequest>,

  /**
   * 表单标签位置。
   */
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'top',
  },

  /**
   * 表单标签宽度。
   */
  labelWidth: {
    type: String,
    default: '120px',
  },

  /**
   * 是否显示取消按钮。
   */
  showCancelButton: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示确认按钮。
   */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },

  /**
   * 取消按钮文本。
   */
  cancelButtonText: String,

  /**
   * 确认按钮文本。
   */
  confirmButtonText: String,
}

export type VroElSchemaFormDialogProps = ExtractPropTypes<typeof vroElSchemaFormDialogProps>
