import type { Arrayable } from '@vrojs/base'
import {
  type ColProps,
  type FormItemProps,
  type FormItemRule,
  type FormProps,
  type RowProps,
} from 'element-plus'
import { type ExtractPropTypes, type PropType, type Raw } from 'vue'

export interface VroElSchemaFormSchemaField {
  /**
   * 字段渲染组件，支持内置注册名、外部注册名或组件对象。
   */
  is?:
    | 'ElInput'
    | 'ElSelect'
    | 'ElRadioGroup'
    | 'ElCheckboxGroup'
    | 'ElDatePicker'
    | 'ElInputNumber'
    | 'ElTreeSelect'
    | 'ElCascader'
    | 'ElDivider'
    | 'VroElSelect'
    | 'VroElCheckboxGroup'
    | 'VroElRadioGroup'
    | 'VroElImageUpload'
    | 'VroElFileUpload'
    | 'VroElTags'
    | 'VroElTree'
    | Raw<object>
    | (string & {})

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
   * 透传给字段组件的属性。
   */
  props?: Record<string, any>

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
   * 从字段值转换提交值。
   */
  get?: (value: any, filed: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any

  /**
   * 将外部数据写入字段。
   */
  set?: (source: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => void

  /**
   * 是否隐藏字段，支持根据当前字段和完整 schema 动态判断。
   */
  hidden?:
    | boolean
    | ((value: any, filed: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => boolean)

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

export type VroElSchemaFormSchema = Record<string, VroElSchemaFormSchemaField>
export type VroElSchemaFormFormProps = Partial<Omit<FormProps, 'model' | 'rules'>>

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
