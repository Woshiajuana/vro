<template>
  <van-action-sheet
    v-bind="actionSheetProps"
    class="vro-van-action-sheet"
    :actions="computedProps.actions"
    :cancel-text="computedProps.cancelText || t('actionSheet.cancelText')"
    :close-on-click-action="false"
    :show="visible"
    @update:show="handleVisibleChange"
    @select="handleSelect"
    @closed="$emit('closed')"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </van-action-sheet>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useVisible } from '@vrojs/use'
  import type { ActionSheetAction } from 'vant'
  import { ActionSheet as VanActionSheet, actionSheetProps as vanActionSheetProps } from 'vant'
  import { computed, ref } from 'vue'

  import { useLocale } from '../locale'
  import {
    type VroVanActionSheetEmits,
    type VroVanActionSheetProps,
    vroVanActionSheetProps,
    type VroVanActionSheetResult,
    type VroVanActionSheetSlots,
  } from './types'

  defineOptions({ name: 'VroVanActionSheet' })

  const slots = defineSlots<VroVanActionSheetSlots>()
  const emit = defineEmits<VroVanActionSheetEmits>()
  const props = defineProps(vroVanActionSheetProps)

  const { t } = useLocale()

  const dynamicProps = ref<Partial<VroVanActionSheetProps>>()
  const computedProps = computed<VroVanActionSheetProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const actionSheetProps = computed(() => pick(computedProps.value, typedKeys(vanActionSheetProps)))

  const { visible, show, hide, confirm } = useVisible<
    Partial<VroVanActionSheetProps>,
    VroVanActionSheetResult
  >({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => {
      emit('cancel', reason)
    },
    confirmCallback: (action: ActionSheetAction, index: number) => {
      return { action, index }
    },
  })

  const handleVisibleChange = (value: boolean) => {
    if (!value && visible.value) {
      hide('cancel')
    }
  }

  const handleSelect = async (action: ActionSheetAction, index: number) => {
    await confirm(action, index)
  }

  defineExpose({
    show,
    hide,
    confirm,
  })
</script>
