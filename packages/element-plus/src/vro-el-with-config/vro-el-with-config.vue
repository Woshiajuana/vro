<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus'
  import { h, ref, useAttrs, useSlots } from 'vue'

  import { vroElWithConfigProps } from './types'

  defineOptions({ name: 'VroElWithConfig' })

  const props = defineProps(vroElWithConfigProps)
  const attrs = useAttrs()
  const slots = useSlots()

  const refComponent = ref<any>()

  defineExpose(
    new Proxy(
      {},
      {
        get(_target, prop) {
          return refComponent.value?.[prop]
        },
        has(_target, prop) {
          return refComponent.value ? prop in refComponent.value : false
        },
      },
    ),
  )

  const renderContent = () => {
    if (props.is) {
      return h(props.is, { ...attrs, ref: refComponent }, slots)
    }

    return slots.default?.()
  }

  const Render = () => h(ElConfigProvider, props.elConfigProps, renderContent)
</script>

<template>
  <Render />
</template>
