import type { Component, ExtractPropTypes, PropType, Raw } from 'vue'

export type VroElTableColumnGroupColumnComponent = string | Raw<Component>

export interface VroElCustomTableColumn {
  /**
   * 列组件。可以传入组件对象、已注册组件名，或通过 vroElTableColumnGroupColumnManager 注册的 key。
   */
  is: VroElTableColumnGroupColumnComponent

  /**
   * 列字段名，透传给列组件，同时作为默认 key 使用。
   */
  prop?: string

  /**
   * 额外列属性，会与当前配置合并后透传给列组件。
   */
  props?: Record<string, any>

  /**
   * 是否隐藏当前列。
   */
  hidden?: boolean | (() => boolean)

  /**
   * 其他属性会直接透传给列组件。
   */
  [key: string]: any
}

export type VroElTableColumnGroupColumn = VroElCustomTableColumn

export const vroElTableColumnGroupProps = {
  /**
   * 表格列配置。
   */
  columns: {
    type: Array as PropType<VroElTableColumnGroupColumn[]>,
    default: () => [],
  },
}

export type VroElTableColumnGroupProps = ExtractPropTypes<typeof vroElTableColumnGroupProps>
