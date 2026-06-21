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
  props?: Record<string, any>
  label?: string
  value?: any
  defaultValue?: any
  colProps?: Partial<ColProps>
  formItemProps?: Partial<FormItemProps>
  options?: any
  labelKey?: string
  valueKey?: string
  set?: (source: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => void
  get?: (value: any, filed: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any
  hidden?:
    | boolean
    | ((value: any, filed: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => boolean)
  rules?:
    | Arrayable<FormItemRule>
    | ((
        value: any,
        field: VroElSchemaFormSchemaField,
        metadata: VroElSchemaFormSchema,
      ) => Arrayable<FormItemRule>)
  onChange?: (value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any
  onInput?: (value: any, field: VroElSchemaFormSchemaField, metadata: VroElSchemaFormSchema) => any
  [key: string]: any
}

export type VroElSchemaFormSchema = Record<string, VroElSchemaFormSchemaField>
export type VroElSchemaFormFormProps = Partial<Omit<FormProps, 'model' | 'rules'>>

export const vroElSchemaFormProps = {
  formProps: {
    type: Object as PropType<VroElSchemaFormFormProps>,
    default: () => ({}),
  },
  rowProps: {
    type: Object as PropType<Partial<RowProps>>,
    default: () => ({}),
  },
  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({}),
  },
  formItemProps: {
    type: Object as PropType<Partial<FormItemProps>>,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<VroElSchemaFormSchema>,
    default: () => ({}),
  },
}

export type VroElSchemaFormProps = ExtractPropTypes<typeof vroElSchemaFormProps>
