<template>
  <el-table-column v-bind="tableColumnProps">
    <template v-if="isExpandColumn" #default="scope">
      <slot v-bind="scope"></slot>
    </template>

    <template v-else-if="shouldRenderDefaultSlot" #default="scope">
      <cell-content :scope="scope" />
    </template>

    <template v-for="name in forwardSlotNames" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
  import { getByPath, isFunction, pick, typedKeys } from '@daysnap/utils'
  import { ElTableColumn } from 'element-plus'
  import { computed, h, type VNodeChild } from 'vue'

  import { elTableColumnProps } from '../utils'
  import { VroElIcon } from '../vro-el-icon'
  import {
    type VroElTableColumnIcon,
    vroElTableColumnProps,
    type VroElTableColumnRenderScope,
    type VroElTableColumnScope,
    type VroElTableColumnSlots,
  } from './types'

  defineOptions({ name: 'VroElTableColumn' })

  const props = defineProps(vroElTableColumnProps)
  const slots = defineSlots<VroElTableColumnSlots>()

  const specialColumnTypes = ['selection', 'index', 'expand']
  const ownSlotNames: (keyof VroElTableColumnSlots)[] = ['default', 'prefix', 'suffix']

  // formatter 由组件内部接管，不再透传给 el-table-column
  const tableColumnKeys = typedKeys(elTableColumnProps).filter((key) => key !== 'formatter')

  const tableColumnProps = computed(() => pick(props, tableColumnKeys))
  const isExpandColumn = computed(() => props.type === 'expand')

  // default、prefix、suffix 由组件自己消费，其余插槽透传给 el-table-column
  const forwardSlotNames = computed(() => {
    return typedKeys(slots).filter((name) => {
      return !ownSlotNames.includes(name) && !String(name).startsWith('_')
    })
  })

  const shouldRenderDefaultSlot = computed(() => {
    return !specialColumnTypes.includes(props.type) || !!slots.default || !!props.render
  })

  const CellContent = ({ scope }: { scope: VroElTableColumnScope }) => {
    // el-table-column 会以 { row: {}, column: {}, $index: -1 } 调用默认插槽来收集子列，这里不渲染内容
    if (scope.$index < 0) {
      return null
    }

    if (slots.default) {
      return slots.default(scope)
    }

    return renderCell(scope)
  }

  const renderCell = (scope: VroElTableColumnScope) => {
    const renderScope: VroElTableColumnRenderScope = {
      ...scope,
      ...formatCellValue(scope),
    }

    if (props.render) {
      return props.render(renderScope)
    }

    return h('div', { class: ['vro-el-table-column-content', `is-${props.align || 'left'}`] }, [
      renderAffix('prefix', slots.prefix?.(renderScope) ?? renderIcon(props.prefixIcon)),
      renderContent(renderScope),
      renderAffix('suffix', slots.suffix?.(renderScope) ?? renderIcon(props.suffixIcon)),
    ])
  }

  const renderAffix = (name: 'prefix' | 'suffix', content?: VNodeChild) => {
    if (content == null) {
      return null
    }

    return h('span', { class: `vro-el-table-column-${name}` }, content)
  }

  const renderIcon = (icon?: VroElTableColumnIcon) => {
    if (!icon) {
      return null
    }

    return h(VroElIcon, typeof icon === 'string' ? { name: icon } : icon)
  }

  const renderContent = (scope: VroElTableColumnRenderScope) => {
    if (props.renderContent) {
      return props.renderContent(scope)
    }

    return h(
      'span',
      {
        class: ['vro-el-table-column-text', { 'is-line-clamp': !!props.lineClamp }],
        style: props.lineClamp
          ? { '--vro-el-table-column-line-clamp': props.lineClamp }
          : undefined,
      },
      isEmptyCellValue(scope.value) ? props.placeholder : scope.value,
    )
  }

  const formatCellValue = (scope: VroElTableColumnScope) => {
    const { row, column, $index } = scope
    const prop = props.prop || props.property
    const rawValue = getByPath(row, prop)
    const value = props.formatter
      ? props.formatter(row, column, rawValue, $index)
      : getMappedValue(rawValue, row, $index)

    return {
      rawValue,
      value: appendUnit(value),
    }
  }

  const appendUnit = (value: unknown) => {
    const canAppend = typeof value === 'string' || typeof value === 'number'
    return props.unit && canAppend && !isEmptyCellValue(value) ? `${value}${props.unit}` : value
  }

  const getMappedValue = (value: unknown, row: any, index: number) => {
    const map = isFunction(props.map) ? props.map(row, index) : props.map

    if (!map || value == null) {
      return value
    }

    return Object.prototype.hasOwnProperty.call(map, value as PropertyKey)
      ? map[value as PropertyKey]
      : value
  }

  const isEmptyCellValue = (value: unknown) => {
    return value == null || value === '' || (Array.isArray(value) && !value.length)
  }
</script>
