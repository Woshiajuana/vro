<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus'
  import { h, ref, useAttrs, useSlots } from 'vue'

  import { VroElConfigProvider } from '../vro-el-config-provider'
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

  const renderVroConfigProvider = () =>
    h(VroElConfigProvider, props.vroConfigProps, {
      default: renderContent,
    })

  const Render = () => h(ElConfigProvider, props.elConfigProps, renderVroConfigProvider)
</script>

<template>
  <Render />
</template>
