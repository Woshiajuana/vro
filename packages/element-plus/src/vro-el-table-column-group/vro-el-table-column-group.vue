<template>
  <component
    v-for="(item, index) in metadata"
    v-bind="item"
    :key="getColumnKey(item, index)"
    :is="item.is"
  />
</template>

<script setup lang="ts">
  import { isFunction, isString } from '@daysnap/utils'
  import { computed } from 'vue'

  import { VroElTableColumn } from '../vro-el-table-column'
  import { vroElTableColumnGroupProps } from './types'
  import { vroElTableColumnGroupColumnManager } from './vroElTableColumnGroupColumnManager'

  defineOptions({ name: 'VroElTableColumnGroup' })

  const props = defineProps(vroElTableColumnGroupProps)

  const metadata = computed(() => {
    return props.columns.flatMap((item) => {
      const { props: columnProps, is = VroElTableColumn, hidden, ...rest } = item

      if (isFunction(hidden) ? hidden() : hidden) {
        return []
      }

      if (isString(is)) {
        const field = vroElTableColumnGroupColumnManager.get(is)
        if (field) {
          return Object.assign({}, field.props, rest, columnProps, { is: field.is })
        }
      }

      return Object.assign({}, rest, columnProps, { is })
    })
  })

  const getColumnKey = (item: Record<string, any>, index: number) => {
    return item.key ?? item.columnKey ?? item.prop ?? item.label ?? index
  }
</script>
