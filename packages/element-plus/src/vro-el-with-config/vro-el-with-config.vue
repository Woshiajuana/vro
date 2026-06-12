<template>
  <el-config-provider v-bind="elConfigProps">
    <component v-if="is" :is="is" ref="refComponent" v-bind="$attrs" />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus'
  import { onBeforeUnmount, onUnmounted, useTemplateRef } from 'vue'

  import { vroElWithConfigProps } from './types'

  defineOptions({ name: 'VroElWithConfig' })

  defineProps(vroElWithConfigProps)

  const refComponent = useTemplateRef<any>('refComponent')

  onBeforeUnmount(() => console.log('with-config 即将销毁'))
  onUnmounted(() => console.log('with-config 销毁了'))

  defineExpose(
    new Proxy(
      {},
      {
        get(_target, prop) {
          return refComponent.value?.[prop]
        },
        has(_target, prop) {
          return prop in refComponent.value
        },
      },
    ),
  )
</script>
