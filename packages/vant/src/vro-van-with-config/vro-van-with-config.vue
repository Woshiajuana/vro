<script setup lang="ts">
  import { ConfigProvider as VanConfigProvider } from 'vant'
  import { h, ref, useAttrs, useSlots } from 'vue'

  import { VroVanConfigProvider } from '../vro-van-config-provider'
  import { vroVanWithConfigProps } from './types'

  defineOptions({ name: 'VroVanWithConfig' })

  const props = defineProps(vroVanWithConfigProps)
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

    return (slots as any).default?.()
  }

  const renderVroConfigProvider = () =>
    h(VroVanConfigProvider, props.vroConfigProps, {
      default: renderContent,
    })

  const Render = () => h(VanConfigProvider, props.vanConfigProps, renderVroConfigProvider)
</script>

<template>
  <Render />
</template>
