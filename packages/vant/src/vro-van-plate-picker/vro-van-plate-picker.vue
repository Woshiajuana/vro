<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-plate-picker"
    :show="visible"
    @click-overlay="hide('cancel')"
    @click-close-icon="hide('cancel')"
    @closed="$emit('closed')"
  >
    <vro-van-picker-toolbar
      :cancel-text="computedProps.cancelText"
      :confirm-text="computedProps.confirmText"
      :title="computedProps.title || t('platePicker.title')"
      @cancel="hide('cancel')"
      @confirm="handleConfirm"
    />
    <ul
      v-if="computedProps.showExtra && computedProps.extraKeys.length"
      class="vro-van-plate-picker-extra-keys"
    >
      <li
        v-for="item in computedProps.extraKeys"
        :key="item"
        class="vro-van-plate-picker-extra-key"
        :class="{ 'is-active': item === currentValue }"
        @click="selectKey(item)"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="vro-van-plate-picker-keys">
      <li
        v-for="item in platePreSource"
        :key="item"
        class="vro-van-plate-picker-key"
        :class="{ 'is-active': item === currentValue }"
        @click="selectKey(item)"
      >
        {{ item }}
      </li>
    </ul>
  </van-popup>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { Popup as VanPopup } from 'vant'
  import { computed, ref, watch } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanPickerToolbar } from '../vro-van-picker-toolbar'
  import {
    platePreSource,
    type VroVanPlatePickerEmits,
    type VroVanPlatePickerProps,
    vroVanPlatePickerProps,
    type VroVanPlatePickerResult,
  } from './types'

  defineOptions({ name: 'VroVanPlatePicker' })

  const emit = defineEmits<VroVanPlatePickerEmits>()
  const props = defineProps(vroVanPlatePickerProps)

  const { t } = useLocale()

  const currentValue = ref('')
  const dynamicProps = ref<Partial<VroVanPlatePickerProps>>()

  const computedProps = computed<VroVanPlatePickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const {
    visible,
    show,
    hide,
    confirm: confirmPicker,
  } = useVisible<Partial<VroVanPlatePickerProps>, VroVanPlatePickerResult>({
    showCallback: (options) => {
      dynamicProps.value = options
      currentValue.value = options?.modelValue ?? props.modelValue ?? ''
    },
    hideCallback: (reason) => {
      emit('cancel', reason)
    },
    confirmCallback: (value: string) => {
      const result = { value }

      emit('update:modelValue', value)
      emit('confirm', result)
      return result
    },
  })

  watch(
    () => computedProps.value.modelValue,
    (value) => {
      if (!visible.value) {
        currentValue.value = value ?? ''
      }
    },
    { immediate: true },
  )

  const selectKey = (value: string) => {
    currentValue.value = value
  }

  const handleConfirm = () => {
    confirmPicker(currentValue.value)
  }

  defineExpose({
    visible,
    show,
    hide,
    confirm: handleConfirm,
  })
</script>
