<template>
  <el-table-column v-bind="tableColumnProps" class="vro-el-table-column">
    <template v-if="shouldRenderDefaultSlot" #default="scope">
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
  import { getProp } from 'element-plus/es/utils/objects'
  import { computed, h, type VNodeChild } from 'vue'

  import { elTableColumnProps } from '../utils'
  import { VroElIcon } from '../vro-el-icon'
  import {
    type VroElTableColumnIcon,
    vroElTableColumnProps,
    type VroElTableColumnScope,
    type VroElTableColumnSlots,
  } from './types'

  defineOptions({ name: 'VroElTableColumn' })

  const props = defineProps(vroElTableColumnProps)
  const slots = defineSlots<VroElTableColumnSlots>()

  const specialColumnTypes = ['selection', 'index', 'expand']
  const tableColumnProps = computed(() => pick(props, typedKeys(elTableColumnProps)))
  const shouldRenderDefaultSlot = computed(() => {
    return !specialColumnTypes.includes(props.type) || !!slots.default || !!props.renderDefault
  })

  const CellContent = ({ scope }: { scope: VroElTableColumnScope }) => {
    if (scope.$index < 0) {
      return null
    }

    if (slots.default) {
      return slots.default(scope)
    }

    if (props.renderDefault) {
      return props.renderDefault(scope)
    }

    return h('div', { class: ['vro-el-table-column-content', `is-${props.align || 'left'}`] }, [
      renderAffix('prefix', slots.prefix?.(scope) ?? renderIcon(props.prefixIcon)),
      renderContent(scope),
      renderAffix('suffix', slots.suffix?.(scope) ?? renderIcon(props.suffixIcon)),
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

  const renderContent = (scope: VroElTableColumnScope) => {
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
      renderCellValue(scope),
    )
  }

  const renderCellValue = (scope: VroElTableColumnScope) => {
    const value = formatCellValue(scope)
    return isEmptyCellValue(value) ? props.placeholder : value
  }

  const formatCellValue = (scope: VroElTableColumnScope) => {
    const { row, column, $index } = scope
    const prop = props.prop || props.property
    const rawValue = prop ? getProp(row, prop).value : undefined
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
      ? props.map[value as PropertyKey]
      : value
  }

  const isEmptyCellValue = (value: unknown) => {
    return value == null || value === '' || (Array.isArray(value) && !value.length)
  }
</script>
