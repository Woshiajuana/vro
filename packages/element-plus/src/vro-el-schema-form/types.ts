import type { Arrayable, ExtractComponentProps, VroSlot } from '@vrojs/base'
import {
  type CascaderComponentProps,
  type CheckboxGroupProps,
  type ColProps,
  type DatePickerProps,
  type DividerProps,
  type ElTreeSelect,
  type FormItemProps,
  type FormItemRule,
  type FormProps,
  type InputNumberProps,
  type InputProps,
  type RadioGroupProps,
  type RowProps,
  type SelectProps,
} from 'element-plus'
import { type ExtractPropTypes, type PropType, type Raw } from 'vue'

import type { VroElCheckboxGroupProps } from '../vro-el-checkbox-group'
import type { VroElFileUploadProps } from '../vro-el-file-upload'
import type { VroElImageUploadProps } from '../vro-el-image-upload'
import type { VroElRadioGroupProps } from '../vro-el-radio-group'
import type { VroElSelectProps } from '../vro-el-select'
import type { VroElTagsProps } from '../vro-el-tags'
import type { VroElTreeProps } from '../vro-el-tree'

export interface VroElSchemaFormFieldPropsMap {
  ElInput: Partial<InputProps>
  ElSelect: Partial<SelectProps>
  ElRadioGroup: Partial<RadioGroupProps>
  ElCheckboxGroup: Partial<CheckboxGroupProps>
  ElDatePicker: Partial<DatePickerProps>
  ElInputNumber: Partial<InputNumberProps>
  ElTreeSelect: Partial<ExtractComponentProps<typeof ElTreeSelect>>
  ElCascader: Partial<CascaderComponentProps>
  ElDivider: Partial<DividerProps>
  VroElSelect: Partial<VroElSelectProps>
  VroElCheckboxGroup: Partial<VroElCheckboxGroupProps>
  VroElRadioGroup: Partial<VroElRadioGroupProps>
  VroElImageUpload: Partial<VroElImageUploadProps>
  VroElFileUpload: Partial<VroElFileUploadProps>
  VroElTags: Partial<VroElTagsProps>
  VroElTree: Partial<VroElTreeProps>
}

export type VroElSchemaFormFieldType = keyof VroElSchemaFormFieldPropsMap
export type VroElSchemaFormRawComponent = Raw<object>

export interface VroElSchemaFormSchemaFieldBase<TProps = Record<string, any>> {
  /**
   * 字段渲染组件，支持内置注册名、外部注册名或组件对象。
   */
  is?: VroElSchemaFormFieldType | VroElSchemaFormRawComponent

  /**
   * 表单项标签文本。
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
   * 当前字段栅格配置，会与组件级 colProps 合并。
   */
  colProps?: Partial<ColProps>

  /**
   * 当前字段表单项配置，会与组件级 formItemProps 合并。
   */
  formItemProps?: Partial<FormItemProps>

  /**
   * 转发给 ElFormItem 的插槽映射，key 为外部插槽名，value 为 ElFormItem 插槽名。
   */
  itemSlots?: Record<string, string>

  /**
   * 转发给字段组件的插槽映射，key 为外部插槽名，value 为字段组件插槽名。
   */
  slots?: Record<string, string>

  /**
   * 从字段值转换提交值。
   */
  get?: (value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any

  /**
   * 将外部数据写入字段。
   */
  set?: (source: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => void

  /**
   * 是否隐藏字段，支持根据当前字段和完整 schema 动态判断。
   */
  hidden?:
    | boolean
    | ((value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => boolean)

  /**
   * 字段校验规则，透传给 ElForm rules。
   */
  rules?:
    | Arrayable<FormItemRule>
    | ((
        value: any,
        field: VroElSchemaFormSchemaField,
        metadata: VroElSchemaFormSchema,
      ) => Arrayable<FormItemRule>)

  /**
   * 字段 change 事件回调。
   */
  onChange?: (value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any

  /**
   * 字段 input 事件回调。
   */
  onInput?: (value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any

  [key: string]: any
}

export type VroElSchemaFormMappedSchemaField = {
  [K in VroElSchemaFormFieldType]: VroElSchemaFormSchemaFieldBase<
    VroElSchemaFormFieldPropsMap[K]
  > & {
    is: K
  }
}[VroElSchemaFormFieldType]

export type VroElSchemaFormCustomSchemaField = VroElSchemaFormSchemaFieldBase & {
  is?: VroElSchemaFormRawComponent
}

export type VroElSchemaFormSchemaField =
  | VroElSchemaFormMappedSchemaField
  | VroElSchemaFormCustomSchemaField

export type VroElSchemaFormSchema = Record<string, VroElSchemaFormSchemaField>
export type VroElSchemaFormFormProps = Partial<Omit<FormProps, 'model' | 'rules'>>

export interface VroElSchemaFormFieldEvent {
  key: string
  value: any
}

export interface VroElSchemaFormSlotProps {
  item: VroElSchemaFormSchemaField
  [key: string]: any
}

export interface VroElSchemaFormEmits {
  'change-field': [payload: VroElSchemaFormFieldEvent]
  'input-field': [payload: VroElSchemaFormFieldEvent]
}

export const vroElSchemaFormProps = {
  /**
   * 透传给 ElForm 的属性，不包含 model 和 rules。
   */
  formProps: {
    type: Object as PropType<VroElSchemaFormFormProps>,
    default: () => ({}),
  },

  /**
   * 透传给 ElRow 的属性。
   */
  rowProps: {
    type: Object as PropType<Partial<RowProps>>,
    default: () => ({}),
  },

  /**
   * 透传给 ElCol 的默认属性，字段级 colProps 优先级更高。
   */
  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({}),
  },

  /**
   * 透传给 ElFormItem 的默认属性，字段级 formItemProps 优先级更高。
   */
  formItemProps: {
    type: Object as PropType<Partial<FormItemProps>>,
    default: () => ({}),
  },

  /**
   * 表单字段 schema 配置。
   */
  schema: {
    type: Object as PropType<VroElSchemaFormSchema>,
    default: () => ({}),
  },
}

export type VroElSchemaFormProps = ExtractPropTypes<typeof vroElSchemaFormProps>

export interface VroElSchemaFormSlots {
  /**
   * 表单尾部内容，会渲染在 ElRow 内部。
   */
  default?: VroSlot

  /**
   * schema 字段 slots 或 itemSlots 配置中的插槽。
   */
  [key: string]: ((props: VroElSchemaFormSlotProps) => any) | VroSlot | undefined
}
