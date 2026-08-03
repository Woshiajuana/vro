<template>
  <van-action-sheet
    cancel-text="取消"
    close-on-click-action
    v-bind="props"
    v-model:show="visible"
    :actions="computedProps.actions"
    @select="confirm"
    @closed="hide"
  />
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import type { ActionSheetAction } from 'vant'
  import { computed, ref } from 'vue'

  import { type VroVanActionSheetProps, vroVanActionSheetProps } from './types'

  defineOptions({ name: 'VroVanActionSheet' })

  const props = defineProps(vroVanActionSheetProps)

  const dynamicProps = ref<Partial<VroVanActionSheetProps>>()
  const computedProps = computed<VroVanActionSheetProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const { visible, show, hide, confirm } = useVisible<
    Partial<VroVanActionSheetProps>,
    ActionSheetAction
  >({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    confirmCallback: (res) => res,
  })

  defineExpose({
    show,
    hide,
    confirm,
  })
</script>
