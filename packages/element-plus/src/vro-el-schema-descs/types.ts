import type { DescriptionItemProps, DescriptionProps } from 'element-plus'
import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

/**
 * 描述项枚举映射，key 为数据源原始值。
 */
export type VroElSchemaDescsItemMap = Record<string | number, any>

/**
 * 描述项配置，对应一个 ElDescriptionsItem。
 */
export interface VroElSchemaDescsItemField<T = any> {
  /**
   * 唯一标识，缺省时依次取 prop、索引，用于优化列表渲染。
   */
  key?: string | number

  /**
   * 标签文本。
   */
  label?: string

  /**
   * 数据源字段路径，支持 a.b.c、list[0].name 写法。
   */
  prop?: string

  /**
   * 字段值，配置 prop 时作为取不到值的兜底。
   */
  value?: any

  /**
   * 空值兜底，默认 '-'。
   */
  defaultValue?: any

  /**
   * 单位，拼接在值后面，空值不拼接。
   */
  unit?: string

  /**
   * 值预处理，入参为数据源原始值和完整数据源。
   */
  get?: (value: any, data: T) => any

  /**
   * 枚举映射，展示前把原始值替换成映射值。
   */
  map?: VroElSchemaDescsItemMap

  /**
   * 枚举映射取值字段，false 表示直接使用映射结果，默认 'label'。
   */
  mapValueKey?: string | false

  /**
   * 值格式化，在 get、map 之后执行。
   */
  formatter?: (value: any, data: T) => any

  /**
   * 自定义渲染，入参为展示值和完整数据源，返回 vnode，优先级高于默认文本。
   */
  render?: (value: any, data: T) => VNodeChild

  /**
   * 当前描述项的 ElDescriptionsItem 属性，优先级高于组件级 itemProps。
   */
  itemProps?: Partial<DescriptionItemProps>

  /**
   * 是否隐藏，入参为处理后的原始值和完整数据源。
   */
  hidden?: boolean | ((value: any, data: T) => boolean)
}

/**
 * 描述 schema 的每一项，支持描述项、嵌套分组、按数据源生成的分组。
 */
export type VroElSchemaDescsSchemaItem<T = any> =
  | VroElSchemaDescsItemField<T>
  | VroElSchemaDescsSchema<T>
  | ((data: T) => VroElSchemaDescsSchema<T>)

/**
 * 描述 schema，支持嵌套分组、按数据源生成的写法。
 */
export type VroElSchemaDescsSchema<T = any> = VroElSchemaDescsSchemaItem<T>[]

export const vroElSchemaDescsProps = {
  /**
   * 数据源。
   */
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },

  /**
   * 描述项 schema。
   */
  schema: {
    type: [Array, Function] as PropType<
      VroElSchemaDescsSchema | ((data: any) => VroElSchemaDescsSchema)
    >,
    default: () => [],
  },

  /**
   * 透传给 ElDescriptions 的属性，默认带边框。
   */
  descProps: {
    type: Object as PropType<Partial<DescriptionProps>>,
    default: () => ({}),
  },

  /**
   * 透传给 ElDescriptionsItem 的默认属性，字段级 itemProps 优先级更高。
   */
  itemProps: {
    type: Object as PropType<Partial<DescriptionItemProps>>,
    default: () => ({}),
  },
}

export type VroElSchemaDescsProps = ExtractPropTypes<typeof vroElSchemaDescsProps>

export interface VroElSchemaDescsSlotProps<T = any> {
  /**
   * 当前描述项，value 为处理后的展示值。
   */
  item: VroElSchemaDescsItemField<T>

  /**
   * 数据源。
   */
  data: T

  /**
   * 当前描述项索引。
   */
  index: number
}

export interface VroElSchemaDescsSlots<T = any> {
  /**
   * 自定义描述项内容，优先级高于 is 和默认文本。
   */
  item?: (props: VroElSchemaDescsSlotProps<T>) => any
}
