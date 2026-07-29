<template>
  <el-table-column v-bind="tableColumnProps" class="vro-el-table-column">
    <template #default="scope">
      <cell-content :scope="scope" />
    </template>

    <template v-if="$slots.header" #header="scope">
      <slot name="header" v-bind="scope"></slot>
    </template>

    <template v-if="$slots.expand" #expand="scope">
      <slot name="expand" v-bind="scope"></slot>
    </template>

    <template v-if="$slots['filter-icon']" #filter-icon="scope">
      <slot name="filter-icon" v-bind="scope"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { ElTableColumn } from 'element-plus'
  import { computed, h } from 'vue'

  import { VroElIcon } from '../vro-el-icon'
  import {
    elTableColumnProps,
    type VroElTableColumnIcon,
    vroElTableColumnProps,
    type VroElTableColumnScope,
    type VroElTableColumnSlots,
  } from './types'

  defineOptions({ name: 'VroElTableColumn' })

  const props = defineProps(vroElTableColumnProps)
  const slots = defineSlots<VroElTableColumnSlots>()

  const tableColumnProps = computed(() => pick(props, typedKeys(elTableColumnProps)))

  const CellContent = ({ scope }: { scope: VroElTableColumnScope }) => {
    if (slots.default) {
      return slots.default(scope)
    }

    return h('div', { class: 'vro-el-table-column-content' }, [
      slots.prefix?.(scope) ?? renderIcon(props.prefixIcon),
      h(
        'span',
        {
          class: ['vro-el-table-column-text', { 'is-line-clamp': !!props.lineClamp }],
          style: props.lineClamp
            ? { '--vro-el-table-column-line-clamp': props.lineClamp }
            : undefined,
        },
        renderCellValue(scope),
      ),
      slots.suffix?.(scope) ?? renderIcon(props.suffixIcon),
    ])
  }

  const renderIcon = (icon?: VroElTableColumnIcon) => {
    if (!icon) {
      return null
    }

    return h(VroElIcon, typeof icon === 'string' ? { name: icon } : icon)
  }

  const renderCellValue = (scope: VroElTableColumnScope) => {
    if (props.renderDefault) {
      return props.renderDefault(scope)
    }

    const content = props.renderContent?.(scope) ?? formatCellValue(scope)
    return isEmptyCellValue(content) ? props.placeholder : content
  }

  const formatCellValue = (scope: VroElTableColumnScope) => {
    const { row, column, $index } = scope
    const prop = props.prop || props.property
    const rawValue = prop ? getValueByPath(row, prop) : undefined
    const formattedValue = props.formatter
      ? props.formatter(row, column, rawValue, $index)
      : getMappedValue(rawValue)

    return isEmptyCellValue(formattedValue) || !props.unit
      ? formattedValue
      : `${formattedValue}${props.unit}`
  }

  const getMappedValue = (value: unknown) => {
    if (!props.map || value == null) {
      return value
    }

    return Object.prototype.hasOwnProperty.call(props.map, value as PropertyKey)
      ? props.map[value as string]
      : value
  }

  const getValueByPath = (data: any, path: string) => {
    return path.split('.').reduce((value, key) => value?.[key], data)
  }

  const isEmptyCellValue = (value: unknown) => {
    return value == null || value === '' || (Array.isArray(value) && !value.length)
  }
</script>
