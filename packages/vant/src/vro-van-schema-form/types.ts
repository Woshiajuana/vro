import type { Arrayable, VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType, Raw } from 'vue'

import type { VroVanCellGroupProps } from '../vro-van-cell-group'
import type { VroVanCheckboxProps } from '../vro-van-checkbox'
import type { VroVanCheckboxButtonProps } from '../vro-van-checkbox-button'
import type { VroVanDatetimeRangeSelectPickerProps } from '../vro-van-datetime-range-select-picker'
import type { VroVanDatetimeSelectPickerProps } from '../vro-van-datetime-select-picker'
import type { VroVanFieldProps } from '../vro-van-field'
import type { VroVanImageUploaderProps } from '../vro-van-image-uploader'
import type { VroVanPlateInputProps } from '../vro-van-plate-input'
import type { VroVanRadioProps } from '../vro-van-radio'
import type { VroVanRadioButtonProps } from '../vro-van-radio-button'
import type { VroVanSelectPickerProps } from '../vro-van-select-picker'
import type { VroVanTextareaProps } from '../vro-van-textarea'

export interface VroVanSchemaFormFieldPropsMap {
  VroVanField: Partial<VroVanFieldProps>
  VroVanTextarea: Partial<VroVanTextareaProps>
  VroVanRadio: Partial<VroVanRadioProps>
  VroVanCheckbox: Partial<VroVanCheckboxProps>
  VroVanRadioButton: Partial<VroVanRadioButtonProps>
  VroVanCheckboxButton: Partial<VroVanCheckboxButtonProps>
  VroVanSelectPicker: Partial<VroVanSelectPickerProps>
  VroVanDatetimeSelectPicker: Partial<VroVanDatetimeSelectPickerProps>
  VroVanDatetimeRangeSelectPicker: Partial<VroVanDatetimeRangeSelectPickerProps>
  VroVanImageUploader: Partial<VroVanImageUploaderProps>
  VroVanPlateInput: Partial<VroVanPlateInputProps>
}

export type VroVanSchemaFormFieldType = keyof VroVanSchemaFormFieldPropsMap
export type VroVanSchemaFormRawComponent = Raw<object>

export interface VroVanSchemaFormRule {
  /**
   * 是否必填。
   */
  required?: boolean

  /**
   * 校验失败提示。
   */
  message?: string

  /**
   * 自定义校验函数，返回 false、字符串或抛错表示校验失败。
   */
  validator?: (
    value: any,
    field: VroVanSchemaFormSchemaField,
    metadata: VroVanSchemaFormSchema,
  ) => boolean | string | Error | void | Promise<boolean | string | Error | void>
}

export interface VroVanSchemaFormSchemaFieldBase<TProps = Record<string, any>> {
  /**
   * 字段渲染组件，支持内置注册名、外部注册名或组件对象。
   */
  is?: VroVanSchemaFormFieldType | VroVanSchemaFormRawComponent | string

  /**
   * 字段标题文本。
   */
  label?: string

  /**
   * 字段当前值。
   */
  value?: any

  /**
   * 字段默认值，供外部工具生成初始值时使用。
   */
  defaultValue?: any

  /**
   * 字段重置值，重置的时候使用。
   */
  resetValue?: any

  /**
   * 透传给字段组件的属性。
   */
  props?: TProps

  /**
   * 字段选项列表，常用于选择器、单选、多选等组件。
   */
  options?: any

  /**
   * 选项展示文本字段名。
   */
  labelKey?: string

  /**
   * 选项绑定值字段名。
   */
  valueKey?: string

  /**
   * 转发给字段组件的插槽映射，key 为外部插槽名，value 为字段组件插槽名。
   */
  slots?: Record<string, string>

  /**
   * 从字段值转换提交值。
   */
  get?: (value: any, field: VroVanSchemaFormSchemaField, metadata: VroVanSchemaFormSchema) => any

  /**
   * 将外部数据写入字段。
   */
  set?: (source: any, field: VroVanSchemaFormSchemaField, metadata: VroVanSchemaFormSchema) => void

  /**
   * 是否隐藏字段，支持根据当前字段和完整 schema 动态判断。
   */
  hidden?:
    | boolean
    | ((
        value: any,
        field: VroVanSchemaFormSchemaField,
        metadata: VroVanSchemaFormSchema,
      ) => boolean)

  /**
   * 字段校验规则。
   */
  rules?:
    | Arrayable<VroVanSchemaFormRule>
    | ((
        value: any,
        field: VroVanSchemaFormSchemaField,
        metadata: VroVanSchemaFormSchema,
      ) => Arrayable<VroVanSchemaFormRule>)

  /**
   * 字段 change 事件回调。
   */
  onChange?: (
    value: any,
    field: VroVanSchemaFormSchemaField,
    metadata: VroVanSchemaFormSchema,
  ) => any

  /**
   * 字段 input 事件回调。
   */
  onInput?: (
    value: any,
    field: VroVanSchemaFormSchemaField,
    metadata: VroVanSchemaFormSchema,
  ) => any

  [key: string]: any
}

export type VroVanSchemaFormMappedSchemaField = {
  [K in VroVanSchemaFormFieldType]: VroVanSchemaFormSchemaFieldBase<
    VroVanSchemaFormFieldPropsMap[K]
  > & {
    is: K
  }
}[VroVanSchemaFormFieldType]

export type VroVanSchemaFormCustomSchemaField = VroVanSchemaFormSchemaFieldBase & {
  is?: VroVanSchemaFormRawComponent | string
}

export type VroVanSchemaFormSchemaField =
  | VroVanSchemaFormMappedSchemaField
  | VroVanSchemaFormCustomSchemaField

export type VroVanSchemaFormSchemaBase = Record<string, VroVanSchemaFormSchemaFieldBase>
export type VroVanSchemaFormSchema = Record<string, VroVanSchemaFormSchemaField>

export interface VroVanSchemaFormFieldEvent {
  key: string
  value: any
}

export interface VroVanSchemaFormSlotProps {
  item: VroVanSchemaFormSchemaField
  [key: string]: any
}

export interface VroVanSchemaFormEmits {
  'change-field': [payload: VroVanSchemaFormFieldEvent]
  'input-field': [payload: VroVanSchemaFormFieldEvent]
}

export const vroVanSchemaFormProps = {
  /**
   * 透传给 VroVanCellGroup 的属性。
   */
  cellGroupProps: {
    type: Object as PropType<Partial<VroVanCellGroupProps>>,
    default: () => ({}),
  },

  /**
   * 表单字段 schema 配置。
   */
  schema: {
    type: Object as PropType<VroVanSchemaFormSchema>,
    default: () => ({}),
  },
}

export type VroVanSchemaFormProps = ExtractPropTypes<typeof vroVanSchemaFormProps>

export interface VroVanSchemaFormSlots {
  /**
   * 表单尾部内容，会渲染在 VroVanCellGroup 内部。
   */
  default?: VroSlot

  /**
   * schema 字段 slots 配置中的插槽。
   */
  [key: string]: ((props: VroVanSchemaFormSlotProps) => any) | VroSlot | undefined
}
