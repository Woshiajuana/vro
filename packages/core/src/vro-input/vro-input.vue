<template>
  <input
    v-bind="dynamicProps"
    @compositionstart="handleCompositionstart"
    @compositionend="handleCompositionend"
    @input="handleInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { useComposition } from '../hooks/use-composition'
  import { vroInputProps } from './types'

  const emit = defineEmits(['update:model-value', 'change', 'focus', 'blur'])
  const props = defineProps(vroInputProps)

  const dynamicProps = computed(() => {
    // eslint-disable-next-line prefer-const
    let { type, inputmode, pattern, ...rest } = props

    if (type === 'digit') {
      type = 'text'
      inputmode = 'decimal'
    } else if (type === 'number') {
      type = 'tel'
      inputmode = 'numeric'
    }

    return { ...rest, type, inputmode }
  })

  const { handleCompositionstart, handleCompositionend } = useComposition()

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    if ((target as any)?.composing) {
      return
    }
    const value = target.value
    const { type, fractionDigits, pattern, modelValue } = props

    if (value === 'number') {
      //
    }
    console.log('handleInput => ', value)
    emit('update:model-value', value)
    emit('change', value)
  }
</script>
