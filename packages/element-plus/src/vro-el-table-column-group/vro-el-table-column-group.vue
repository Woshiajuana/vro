<template>
  <Component
    v-for="(item, index) in metadata"
    v-bind="item"
    :key="item.prop ?? index"
    :is="item.is"
  />
</template>

<script setup lang="ts">
  import { isString } from '@daysnap/utils'
  import { computed } from 'vue'

  import { vroElTableColumnGroupProps } from './types'
  import { vroElTableColumnGroupColumnManager } from './vroElTableColumnGroupColumnManager'

  defineOptions({ name: 'VroElTableColumnGroup' })

  const props = defineProps(vroElTableColumnGroupProps)

  const metadata = computed(() => {
    return props.columns.map((item) => {
      // eslint-disable-next-line prefer-const
      let { props, is, ...rest } = item

      if (isString(is)) {
        const field = vroElTableColumnGroupColumnManager.get(is)
        if (field) {
          is = field.is
          props = Object.assign({}, field.props, props)
        }
      }

      return Object.assign({}, rest, props, { is })
    })
  })
</script>
