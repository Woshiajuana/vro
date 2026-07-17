<template>
  <component
    v-for="(item, index) in metadata"
    v-bind="item"
    :key="item.prop ?? index"
    :is="item.is"
  />
</template>

<script setup lang="ts">
  import { isFunction, isString } from '@daysnap/utils'
  import { computed } from 'vue'

  import { vroElTableColumnGroupProps } from './types'
  import { vroElTableColumnGroupColumnManager } from './vroElTableColumnGroupColumnManager'

  defineOptions({ name: 'VroElTableColumnGroup' })

  const props = defineProps(vroElTableColumnGroupProps)

  const metadata = computed(() => {
    return props.columns.flatMap((item) => {
      let { props: columnProps, is, hidden, ...rest } = item

      if (isFunction(hidden) ? hidden() : hidden) {
        return []
      }

      if (isString(is)) {
        const field = vroElTableColumnGroupColumnManager.get(is)
        if (field) {
          is = field.is
          columnProps = Object.assign({}, field.props, columnProps)
        }
      }

      return Object.assign({}, rest, columnProps, { is })
    })
  })
</script>
