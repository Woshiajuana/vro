import type { VroSlot } from '@vrojs/base'
import type { DrawerProps } from 'element-plus'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

import {
  type VroElSchemaFormFieldEvent,
  type VroElSchemaFormFormProps,
  vroElSchemaFormProps,
  type VroElSchemaFormSchema,
  type VroElSchemaFormSlotProps,
} from '../vro-el-schema-form'

export interface VroElSchemaFormDrawerRequest {
  (data: any, schema: VroElSchemaFormSchema): Promise<any>
}

export interface VroElSchemaFormDrawerEmits {
  'change-field': [payload: VroElSchemaFormFieldEvent]
  'input-field': [payload: VroElSchemaFormFieldEvent]
  cancel: [reason?: any]
  confirm: [data: any]
  closed: []
}

export const vroElSchemaFormDrawerProps = {
  ...vroElSchemaFormProps,

  /**
   * 抽屉标题。
   */
  title: String,

  /**
   * 抽屉弹出方向。
   */
  direction: {
    type: String as PropType<DrawerProps['direction']>,
    default: 'rtl',
  },

  /**
   * 抽屉尺寸。
   */
  size: {
    type: [String, Number] as PropType<DrawerProps['size']>,
    default: 'var(--vro-el-schema-form-drawer-size)',
  },

  /**
   * 是否显示抽屉头部。
   */
  withHeader: {
    type: Boolean,
    default: true,
  },

  /**
   * 抽屉样式。
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  /**
   * 确认前的提交请求，返回值会作为 confirm 事件参数。
   */
  request: Function as PropType<VroElSchemaFormDrawerRequest>,

  /**
   * 透传给 ElForm 的属性，不包含 model 和 rules。
   */
  formProps: {
    type: Object as PropType<VroElSchemaFormFormProps>,
    default: () => ({
      labelPosition: 'top',
    }),
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

export type VroElSchemaFormDrawerProps = ExtractPropTypes<typeof vroElSchemaFormDrawerProps>

export interface VroElSchemaFormDrawerSlots {
  /**
   * 透传给内部 VroElSchemaForm 的默认插槽。
   */
  default?: VroSlot

  /**
   * 转发给内部 VroElSchemaForm 的字段插槽。
   */
  [key: string]: ((props: VroElSchemaFormSlotProps) => any) | VroSlot | undefined
}
